module Fuzzers.Basic exposing (model, imageNumber)

import Char
import Array exposing (Array)

import Random.Pcg as Random exposing (Generator, Seed)
import Fuzz exposing (Fuzzer)
import Shrink exposing (Shrinker)
import Lazy.List as LazyList
import Lazy

import Util exposing (stringGen)
import Fuzzers.ToNumberConfig
import Types
import Config
import ToNumberConfig.Config

{-
type alias Model =
  { stage : Int
  , image : Maybe Image
  , toNumberConfig : ToNumberConfig.Types.Model
  , nonPrime : Maybe ImageNumber
  }
-}

model : Fuzzer Types.Model
model =
    Fuzz.map4
        Types.Model
        (Fuzz.intRange 0 (Config.maxStage - 1))
        image
        Fuzzers.ToNumberConfig.model
        (Fuzz.maybe imageNumber)


image =
  let
    image =
        { contents = "https://www.example.com/images/dinosaur.jpg"
        , filename = "example/image.jpg"
        }
  in
    (Fuzz.maybe <| Fuzz.constant image)


imageNumber =
    let
      imageNumberGen =
          sizeGen
            |> Random.andThen
                (\width ->
                    sizeGen
                      |> Random.andThen
                          (\height ->
                              Random.int (Char.toCode '0') (Char.toCode '9')
                                |> Random.map Char.fromCode
                                |> Random.list (width * height)
                                |> Random.map (\list ->
                                    { width = width
                                    , number = list
                                        |> String.fromList
                                    }
                                )
                          )
                )
      charShrink =
          Shrink.atLeastChar '0'
      imageNumberShrink =
          \{ width, number } ->
              LazyList.map2 (\w h -> ( w, h)) (Shrink.int width) (Shrink.int ((String.length number) // width))
                |> Shrink.map (\(width, height) ->
                    { width = width
                    , number = number
                        |> String.slice 0 (width * height)
                    }
                )

    in
      Fuzz.custom imageNumberGen imageNumberShrink



imageNumberConst =
    { width  = 10
    , number = "11012301211101230121110123012111012301211101230121"
    }


sizeGen =
  Random.frequency
    [ ( 8, Random.int 1 (ToNumberConfig.Config.maxImageSize // 20) )
    , ( 1, Random.int 1 ToNumberConfig.Config.maxImageSize )
    ]
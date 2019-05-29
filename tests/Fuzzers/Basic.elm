module Fuzzers.Basic exposing (imageNumber, model)

import Array exposing (Array)
import Char
import Config
import Fuzz exposing (Fuzzer)
import Fuzzers.ToNumberConfig
import NumberString
import Random exposing (Generator, Seed)
import Shrink exposing (Shrinker)
import ToNumberConfig.Config
import Types
import Util exposing (stringGen)



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
    Fuzz.map
        Types.Model
        (Fuzz.intRange 0 (Config.maxStage - 1))
        |> Fuzz.andMap image
        |> Fuzz.andMap (Fuzz.constant "prime end point")
        |> Fuzz.andMap Fuzzers.ToNumberConfig.model
        |> Fuzz.andMap (Fuzz.maybe imageNumber)
        |> Fuzz.andMap (Fuzz.constant Types.NothingYet)


image =
    let
        sampleImage =
            { contents = "https://www.example.com/images/dinosaur.jpg"
            , filename = "example/image.jpg"
            }
    in
    Fuzz.maybe <| Fuzz.constant sampleImage


imageNumber : Fuzzer NumberString.T
imageNumber =
    Fuzz.map2
        (\width height ->
            NumberString.fromString <| String.repeat (width * height) "1"
        )
        sizeFuzz
        sizeFuzz



--     imageNumberGen =
--         sizeGen
--             |> Random.andThen
--                 (\width ->
--                     sizeGen
--                         |> Random.andThen
--                             (\height ->
--                                 Random.int (Char.toCode '0') (Char.toCode '9')
--                                     |> Random.map Char.fromCode
--                                     |> Random.list (width * height)
--                                     |> Random.map
--                                         (\list ->
--                                             { width = width
--                                             , number =
--                                                 list
--                                                     |> String.fromList
--                                             }
--                                         )
--                             )
--                 )
--     charShrink =
--         Shrink.atLeastChar '0'
--     imageNumberShrink =
--         \{ width, number } ->
--             LazyList.map2 (\w h -> ( w, h )) (Shrink.int width) (Shrink.int (String.length number // width))
--                 |> Shrink.map
--                     (\( width, height ) ->
--                         { width = width
--                         , number =
--                             number
--                                 |> String.slice 0 (width * height)
--                         }
--                     )
-- in
-- Fuzz.custom imageNumberGen imageNumberShrink


imageNumberConst =
    { width = 10
    , number = "11012301211101230121110123012111012301211101230121"
    }


sizeFuzz =
    Fuzz.frequency
        [ ( 8, Fuzz.intRange 1 (ToNumberConfig.Config.maxImageSize // 20) )
        , ( 1, Fuzz.intRange 1 ToNumberConfig.Config.maxImageSize )
        ]

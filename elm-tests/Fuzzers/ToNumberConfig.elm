module Fuzzers.ToNumberConfig exposing (model)

import Char
import Array exposing (Array)

import Random.Pcg as Random exposing (Generator)
import Fuzz exposing (Fuzzer)
import Shrink exposing (Shrinker)

import Util exposing (stringGen)
import ToNumberConfig.Types as Types exposing (makeErrorable)
import ToNumberConfig.Config as Config


model : Fuzzer Types.Model
model =
  let
    generator =
        Random.map3
            Types.Model
            (generateErrorable <| Random.int 0 Config.maxImageSize)
            (generateErrorable <| Random.int 0 Config.maxImageSize)
            (randArray Config.numberOfLevels (generateErrorable <| Random.int 0 Config.maxLevel))

    shrinker =
        \{ width, height, levels } ->
          Shrink.map Types.Model (shrinkErrorable Shrink.int width)
          |> Shrink.andMap (shrinkErrorable Shrink.int height)
          |> Shrink.andMap (Shrink.array (shrinkErrorable Shrink.int) levels)
  in
    Fuzz.custom generator shrinker


shrinkErrorable : Shrinker a -> Shrinker (Types.Errorable a)
shrinkErrorable valShrinker { value, attemptedValue, error } =
    Shrink.map Types.Errorable (valShrinker value)
      |> Shrink.andMap
          (Shrink.string attemptedValue)
      |> Shrink.andMap
          (error
            |> Maybe.map (Shrink.map Just << Shrink.string)
            |> Maybe.withDefault (Shrink.noShrink Nothing)
          )


generateErrorable : Generator a -> Generator (Types.Errorable a)
generateErrorable valGenerator =
      Random.map Types.Errorable valGenerator
      |> Random.andMap
          (stringGen 0 20)
      |> Random.andMap
          (Random.maybe
              Random.bool
              (stringGen 0 200)
          )


randArray : Int -> Generator a -> Generator (Array a)
randArray n gen =
    Random.list n gen
      |> Random.map Array.fromList

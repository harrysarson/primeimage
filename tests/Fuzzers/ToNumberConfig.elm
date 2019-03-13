module Fuzzers.ToNumberConfig exposing (model)

import Array exposing (Array)
import Char
import Fuzz exposing (Fuzzer)
import Random exposing (Generator)
import Random.Extra
import Shrink exposing (Shrinker)
import ToNumberConfig.Config as Config
import ToNumberConfig.Types as Types exposing (makeErrorable)
import Util exposing (stringGen, randomBool)


model : Fuzzer Types.Model
model =
    let
        generator =
            Random.map2
                Types.Model
                (generateErrorable <| Random.int 0 Config.maxImageSize)
                (randArray Config.numberOfLevels (generateErrorable <| Random.int 0 Config.maxLevel))

        shrinker =
            \{ width, levels } ->
                Shrink.map Types.Model (shrinkErrorable Shrink.int width)
                    |> Shrink.andMap (Shrink.array (shrinkErrorable Shrink.int) levels)
    in
    Fuzz.custom generator shrinker


shrinkErrorable : Shrinker Int -> Shrinker Types.Errorable
shrinkErrorable valShrinker { value, attemptedValue, error } =
    Shrink.map Types.Errorable (valShrinker value)
        |> Shrink.andMap
            (Shrink.string attemptedValue)
        |> Shrink.andMap
            (error
                |> Maybe.map (Shrink.map Just << Shrink.string)
                |> Maybe.withDefault (Shrink.noShrink Nothing)
            )


generateErrorable : Generator Int -> Generator Types.Errorable
generateErrorable valGenerator =
    Random.map Types.Errorable valGenerator
        |> Random.Extra.andMap
            (stringGen 0 20)
        |> Random.Extra.andMap
            (Random.Extra.maybe
                randomBool
                (stringGen 0 200)
            )


randArray : Int -> Generator a -> Generator (Array a)
randArray n gen =
    Random.list n gen
        |> Random.map Array.fromList

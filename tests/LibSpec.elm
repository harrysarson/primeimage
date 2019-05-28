module LibSpec exposing (stageFuzzer, tests)

import Config
import Expect
import Fuzz exposing (Fuzzer)
import Lib
import Test exposing (Test, describe, fuzz, fuzz2, fuzz3, test)
import Types


stageFuzzer : Fuzzer Int
stageFuzzer =
    Fuzz.intRange 0 Config.maxStage


tests : Test
tests =
    describe "Lib"
        [ describe "saturateStageChange"
            [ fuzz3 Fuzz.int stageFuzzer (Fuzz.maybe (Fuzz.constant ())) "Never more negative than current stage" <|
                \change stage image ->
                    Lib.saturateStageChange { stage = stage, image = image } change
                        |> Expect.atLeast -stage
            , fuzz3 Fuzz.int stageFuzzer (Fuzz.maybe (Fuzz.constant ())) "At most max - currentStage" <|
                \change stage image ->
                    Lib.saturateStageChange { stage = stage, image = image } change
                        |> Expect.atMost (Config.maxStage - stage)
            , fuzz stageFuzzer "Starting at zero with image" <|
                \validChange ->
                    Lib.saturateStageChange { stage = 0, image = Just () } validChange
                        |> Expect.equal validChange
            , fuzz stageFuzzer "Starting at zero without image" <|
                \change ->
                    Lib.saturateStageChange { stage = 0, image = Nothing } change
                        |> Expect.equal (min change Config.imageInputStage)
            ]
        ]

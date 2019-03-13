module ToNumberConfig.TypesSpec exposing (tests)

import Array exposing (Array)
import Expect exposing (Expectation)
import Fuzz
import Random
import Test exposing (Test, describe, fuzz, test)
import ToNumberConfig.Types exposing (makeErrorable)


tests : Test
tests =
    describe "ToNumberConfig.Types"
        [ describe "makeErrorable"
            [ fuzz Fuzz.int ".value" <|
                \i ->
                    makeErrorable i
                        |> .value
                        |> Expect.equal i
            , fuzz Fuzz.int ".attemptedValue" <|
                \i ->
                    makeErrorable i
                        |> .attemptedValue
                        |> Expect.equal (String.fromInt i)
            , test ".error" <|
                \() ->
                    makeErrorable 5
                        |> .error
                        |> Expect.equal Nothing
            ]
        ]

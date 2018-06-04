module ToNumberConfig.TypesSpec exposing ( tests )

import Array exposing (Array)

import Random.Pcg as Random

import Test exposing (describe, Test, fuzz, test)
import Expect exposing (Expectation)
import Fuzz

import ToNumberConfig.Types exposing (makeErrorable)

tests : Test
tests =
    describe "ToNumberConfig.Types"
        [ describe "makeErrorable"
            [ fuzz Fuzz.int ".value" <|
                \i -> makeErrorable i
                  |> .value
                  |> Expect.equal i
            , fuzz Fuzz.int ".attemptedValue" <|
                \i -> makeErrorable i
                  |> .attemptedValue
                  |> Expect.equal (toString i)
            , test ".error" <|
                \() -> makeErrorable "a value"
                  |> .error
                  |> Expect.equal Nothing
            ]
        ]



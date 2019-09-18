module StateSpec exposing (tests)

import Config
import Expect
import Fuzz exposing (Fuzzer)
import Fuzzers.Basic exposing (imageNumber, model)
import Fuzzers.ToNumberConfig
import Ports
import Random
import State exposing (initialState, update)
import Task
import Test exposing (Test, describe, fuzz, fuzz2, fuzz3, test)
import ToNumberConfig.State
import ToNumberConfig.Types
import Types


tests : Test
tests =
    describe "State"
        [ describe "initialState"
            [ test ".stage is 0" <|
                \() ->
                    initialState
                        |> Tuple.first
                        |> .stage
                        |> Expect.equal 0
            , test ".image is Nothing" <|
                \() ->
                    initialState
                        |> Tuple.first
                        |> .image
                        |> Expect.equal Nothing
            , test ".nonPrime is Nothing" <|
                \() ->
                    initialState
                        |> Tuple.first
                        |> .nonPrime
                        |> Expect.equal Nothing
            , test ".toNumberConfig is equal to Nothing" <|
                \() ->
                    initialState
                        |> Tuple.first
                        |> .toNumberConfig
                        |> Expect.equal Nothing

            -- , test ".initialState produces the setInitialValues command" <|
            --     \() ->
            --         initialState
            --             |> Tuple.second
            --             |> Expect.equal (Cmd.batch [ Ports.setInitialValues ToNumberConfig.State.initialState ])
            ]
        , describe "Update State"
            [ describe "ChangeState message"
                [ fuzz2
                    model
                    (Fuzz.intRange 0 (Config.maxStage - 1))
                    "change to an existing state"
                  <|
                    \model newStage ->
                        let
                            change =
                                newStage - model.stage
                        in
                        update (Types.ChangeStage change) model
                            |> Tuple.first
                            |> Expect.equal
                                { model
                                    | stage =
                                        if model.image == Nothing && change > 0 then
                                            min newStage Config.imageInputStage

                                        else
                                            newStage
                                }
                , fuzz2
                    model
                    (Fuzz.intRange Random.minInt -1)
                    "change that is too small"
                  <|
                    \model newStage ->
                        let
                            change =
                                newStage - model.stage
                        in
                        update (Types.ChangeStage change) model
                            |> Tuple.first
                            |> Expect.equal { model | stage = 0 }
                , fuzz2
                    model
                    (Fuzz.intRange Config.maxStage Random.maxInt)
                    "change that is too large"
                  <|
                    \model newStage ->
                        let
                            change =
                                newStage - model.stage
                        in
                        update (Types.ChangeStage change) model
                            |> Tuple.first
                            |> Expect.equal
                                { model
                                    | stage =
                                        if model.image == Nothing then
                                            Config.imageInputStage

                                        else
                                            Config.maxStage
                                }
                ]

            -- , describe "ImageSelected message"
            --     [ fuzz
            --         model
            --         "Should not change state"
            --       <|
            --         \model ->
            --             update Types.ImageSelected model
            --                 |> Tuple.first
            --                 |> Expect.equal model
            --     ]
            , describe "ImageRead message"
                [ fuzz2
                    model
                    (Fuzz.constant image)
                    "ImageSelected message does not change state"
                  <|
                    \model newImage ->
                        update (Types.ImageRead newImage) model
                            |> Tuple.first
                            |> Expect.equal { model | image = Just newImage }
                ]
            , describe "UpdateNumberConfig message"
                [ fuzz2
                    model
                    updateNumberConfigMsgFuzz
                    "UpdateNumberConfig message changes state.toNumberConfig"
                  <|
                    \model updateNumberConfigMsg ->
                        let
                            toNumberConfig =
                                Maybe.withDefault ToNumberConfig.State.initialState model.toNumberConfig
                        in
                        update (Types.UpdateNumberConfig updateNumberConfigMsg) model
                            |> Tuple.first
                            |> .toNumberConfig
                            |> Expect.equal
                                (Just (Tuple.first (ToNumberConfig.State.update updateNumberConfigMsg toNumberConfig)))
                ]
            , describe "NonPrimeGenerated message"
                [ fuzz3
                    model
                    Fuzzers.Basic.imageNumber
                    (Fuzz.tuple ( Fuzzers.ToNumberConfig.model, Fuzzers.ToNumberConfig.model ))
                    "With number config already set"
                  <|
                    \model imageNumber ( toNumberConfig1, toNumberConfig2 ) ->
                        let
                            tweakedModel =
                                { model | toNumberConfig = Just toNumberConfig2 }
                        in
                        update (Types.NonPrimeGenerated imageNumber toNumberConfig1) tweakedModel
                            |> Tuple.first
                            |> Expect.equal
                                { tweakedModel
                                    | nonPrime = Just imageNumber
                                }
                , fuzz3
                    model
                    Fuzzers.Basic.imageNumber
                    Fuzzers.ToNumberConfig.model
                    "Update sets number config if not yet set"
                  <|
                    \model imageNumber toNumberConfig ->
                        update (Types.NonPrimeGenerated imageNumber toNumberConfig) { model | toNumberConfig = Nothing }
                            |> Tuple.first
                            |> Expect.equal
                                { model
                                    | nonPrime = Just imageNumber
                                    , toNumberConfig = Just toNumberConfig
                                }
                ]
            ]
        ]


intOutsideRange : Int -> Int -> Fuzzer Int
intOutsideRange lo hi =
    if hi < lo then
        Err <|
            "intOutsideRange was given a lower bound of "
                ++ String.fromInt lo
                ++ " which is greater than the upper bound, "
                ++ String.fromInt hi
                ++ "."

    else
        Fuzz.frequency
            [ ( toFloat (lo - Random.minInt), Fuzz.intRange Random.minInt (lo - 1) )
            , ( toFloat (Random.maxInt - hi), Fuzz.intRange (hi + 1) Random.maxInt )
            ]


updateNumberConfigMsgFuzz =
    Fuzz.oneOf
        [ Fuzz.int
            |> Fuzz.map String.fromInt
            |> Fuzz.map ToNumberConfig.Types.SetWidth

        -- , Fuzz.int
        --     |> Fuzz.map String.fromInt
        --     |> Fuzz.map ToNumberConfig.Types.SetHeight
        , Fuzz.int
            |> Fuzz.map ToNumberConfig.Types.SetLevel
            |> Fuzz.andMap (Fuzz.int |> Fuzz.map String.fromInt)
        ]


image =
    { contents = "https://www.example.com/images/dinosaur.jpg"
    , filename = "example/image.jpg"
    }


debugFunc string f value =
    let
        notUsed =
            Debug.log string (f value)
    in
    value

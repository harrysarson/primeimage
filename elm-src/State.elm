module State exposing
    ( initialState
    , update
    )

import Cmd.Extra
import Config
import Examples
import File
import Json.Decode
import Lib
import NumberString
import Ports
import PrimeWorker
import Task
import ToNumberConfig.State
import ToNumberConfig.Types
import Types


initialState : ( Types.Model, Cmd Types.Msg )
initialState =
    { stage = 0
    , image = Nothing
    , toNumberConfig = Nothing
    , nonPrime = Nothing
    , prime = Nothing
    }
        |> Cmd.Extra.pure


update : Types.Msg -> Types.Model -> ( Types.Model, Cmd Types.Msg )
update msg model =
    case msg of
        Types.Noop ->
            model
                |> Cmd.Extra.pure

        Types.ChangeStage change ->
            let
                newStage =
                    model.stage + Lib.saturateStageChange model change

                requestNonPrimeCmd =
                    if newStage == Config.nonPrimeStage then
                        case model.image of
                            Just image ->
                                Ports.requestNonPrime
                                    { toNumberConfig = model.toNumberConfig
                                    , image = image
                                    }

                            _ ->
                                Cmd.none

                    else
                        Cmd.none
            in
            { model | stage = newStage }
                |> Cmd.Extra.with
                    (Ports.setCssProp ( ".display-panel", "--show-stage", String.fromInt newStage ))
                |> Cmd.Extra.add requestNonPrimeCmd

        Types.ImageSelected file ->
            let
                task =
                    File.toUrl file
                        |> Task.map
                            (\url ->
                                { contents = url
                                , filename = File.name file
                                }
                            )
            in
            model
                |> Cmd.Extra.with
                    (Task.perform Types.ImageRead task)

        Types.SelectExampleImage option ->
            model
                |> Cmd.Extra.with
                    (Task.perform Types.ImageRead (Task.succeed (Examples.getImage option)))

        Types.ImageRead image ->
            { model | image = Just image }
                |> Cmd.Extra.with
                    (case model.nonPrime of
                        Just _ ->
                            Ports.requestNonPrime { toNumberConfig = model.toNumberConfig, image = image }

                        Nothing ->
                            Cmd.none
                    )

        Types.UpdateNumberConfig updateNumberConfigMsg ->
            let
                ( toNumberConfig, numberConfigCmd ) =
                    ToNumberConfig.State.update updateNumberConfigMsg (Maybe.withDefault ToNumberConfig.State.initialState model.toNumberConfig)

                cmd =
                    Cmd.map Types.UpdateNumberConfig numberConfigCmd

                isError =
                    ToNumberConfig.Types.errorsInModel toNumberConfig
                        |> List.isEmpty
                        |> not

                updatedModel =
                    { model | toNumberConfig = Just toNumberConfig }
            in
            if isError then
                { updatedModel | nonPrime = Nothing }
                    |> Cmd.Extra.with cmd

            else
                updatedModel
                    |> Cmd.Extra.with
                        (model.image
                            |> Maybe.map (\i -> Ports.requestNonPrime { toNumberConfig = Just toNumberConfig, image = i })
                            |> Maybe.withDefault Cmd.none
                        )
                    |> Cmd.Extra.add cmd

        Types.NonPrimeGenerated nonPrime toNumberConfig ->
            { model
                | nonPrime = Just nonPrime
                , toNumberConfig = Just (Maybe.withDefault toNumberConfig model.toNumberConfig)
            }
                |> Cmd.Extra.with (Ports.resizeImageNumber ())

        Types.NonPrimeError error ->
            { model | nonPrime = Nothing }
                |> Cmd.Extra.with (Ports.logError error)

        Types.RequestPrime ->
            { model | prime = Just (Types.InProgress []) }
                |> (case model.nonPrime of
                        Just number ->
                            let
                                payload =
                                    PrimeWorker.Start (NumberString.toString number)
                                        |> PrimeWorker.encodePrimeRequestData
                            in
                            Cmd.Extra.with (Ports.requestPrime payload)

                        Nothing ->
                            Cmd.Extra.pure
                   )

        Types.PrimeResponse payload ->
            let
                decoded =
                    Json.Decode.decodeValue PrimeWorker.primeResponseDataDecoder payload
            in
            case decoded of
                Ok response ->
                    let
                        _ =
                            Debug.log "status update" response
                    in
                    { model | prime = Just response }
                        |> Cmd.Extra.with
                            (case response of
                                Types.InProgress status ->
                                    let
                                        checked =
                                            status
                                                |> List.indexedMap Tuple.pair
                                                |> List.foldr
                                                    (\( _, swapsStatus ) checkedBySwapsSoFar ->
                                                        checkedBySwapsSoFar
                                                            + (swapsStatus
                                                                |> Maybe.map .combinationsChecked
                                                                |> Maybe.withDefault 0
                                                              )
                                                    )
                                                    0

                                        expected =
                                            model.nonPrime
                                                |> Maybe.map
                                                    (\img ->
                                                        let
                                                            digits =
                                                                String.length (NumberString.toString img)
                                                        in
                                                        expectedChecks digits
                                                    )
                                                |> Maybe.withDefault 0

                                        fraction =
                                            toFloat checked / toFloat (checked + expected)

                                        {- Why do we square the fraction?

                                           It gives a more linear estimate of progress (looks nicer and
                                           is less fustrating for users)
                                        -}
                                        squaredFraction =
                                            fraction ^ 2
                                    in
                                    Cmd.batch
                                        [ Ports.setCssProp
                                            ( ".prime-progress"
                                            , "--prime-progress"
                                            , String.fromFloat squaredFraction
                                            )
                                        ]

                                Types.FoundPrime _ ->
                                    Ports.resizeImageNumber ()

                                Types.PrimeError string ->
                                    let
                                        err =
                                            "Error generating:\n" ++ string
                                    in
                                    Ports.logError err
                            )

                Err decodeError ->
                    let
                        err =
                            "Error decoding prime response:\n" ++ Json.Decode.errorToString decodeError
                    in
                    { model | prime = Just (Types.PrimeError err) }
                        |> Cmd.Extra.with (Ports.logError err)



-- case model.prime of
--                     Just (Types.InProgress status) ->
--                         Just
--                             { checked =
--                                 status
--                                     |> List.indexedMap Tuple.pair
--                                     |> List.foldr
--                                         (\(_, swapsStatus) checked ->
--                                             checked + (swapsStatus
--                                                 |> Maybe.map .combinationsChecked
--                                                 |> Maybe.withDefault 0
--                                             )
--                                         )
--                                         0
--                             , expected =
--                                 model.nonPrime
--                                     |> Maybe.map
--                                         (\img ->
--                                             let
--                                                 digits = String.length (NumberString.toString img)
--                                             in
--                                                 expectedChecks digits
--                                         )
--                                     |> Maybe.withDefault 0
--                             }
--                     _ ->
--                         Nothing


expectedChecks : Int -> Int
expectedChecks digits =
    let
        primeProb =
            logBase 10 e / toFloat digits

        weOnlyCheckOddNumbers =
            2

        roundSignificantFigures sigFigs x =
            let
                factor =
                    10 ^ (floor (logBase 10 x) + 1 - sigFigs)
            in
            round (x / toFloat factor) * factor
    in
    roundSignificantFigures 2 (1 / primeProb / weOnlyCheckOddNumbers)

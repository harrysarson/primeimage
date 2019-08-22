module State exposing
    ( initialState
    , update
    )

import Cmd.Extra
import Config
import File
import Json.Decode
import Lib
import NumberString
import Ports
    exposing
        ( requestNonPrime
        , resizeImageNumber
        , setCssProp
        )
import PrimeWorker
import Task
import ToNumberConfig.State
import ToNumberConfig.Types
import Types


initialState : ( Types.Model, Cmd Types.Msg )
initialState =
    { stage = 0
    , image = Nothing
    , toNumberConfig = ToNumberConfig.State.initialState
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
                                requestNonPrime
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
                    (setCssProp ( ".display-panel", "--show-stage", String.fromInt newStage ))
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

        Types.ImageRead image ->
            { model | image = Just image }
                |> Cmd.Extra.with
                    (case model.nonPrime of
                        Just _ ->
                            requestNonPrime { toNumberConfig = model.toNumberConfig, image = image }

                        Nothing ->
                            Cmd.none
                    )

        Types.UpdateNumberConfig updateNumberConfigMsg ->
            let
                ( toNumberConfig, numberConfigCmd ) =
                    ToNumberConfig.State.update updateNumberConfigMsg model.toNumberConfig

                cmd =
                    Cmd.map Types.UpdateNumberConfig numberConfigCmd

                isError =
                    ToNumberConfig.Types.errorsInModel toNumberConfig
                        |> List.isEmpty
                        |> not

                updatedModel =
                    { model | toNumberConfig = toNumberConfig }
            in
            if isError then
                { updatedModel | nonPrime = Nothing }
                    |> Cmd.Extra.with cmd

            else
                updatedModel
                    |> Cmd.Extra.with
                        (model.image
                            |> Maybe.map (\i -> requestNonPrime { toNumberConfig = toNumberConfig, image = i })
                            |> Maybe.withDefault Cmd.none
                        )
                    |> Cmd.Extra.add cmd

        Types.NonPrimeGenerated nonPrime ->
            { model | nonPrime = Just nonPrime }
                |> Cmd.Extra.with (resizeImageNumber ())

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
                    { model | prime = Just response }
                        |> Cmd.Extra.with
                            (case response of
                                Types.InProgress statusUpdate ->
                                    let
                                        _ =
                                            Debug.log "status update" statusUpdate
                                    in
                                    Cmd.none

                                Types.FoundPrime _ ->
                                    resizeImageNumber ()

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

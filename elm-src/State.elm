module State exposing
    ( initialState
    , update
    )

import Cmd.Extra
import Config
import File
import NumberString
import Ports
    exposing
        ( requestNonPrime
        , resizeImageNumber
        , setCssProp
        )
import Task
import ToNumberConfig.State
import ToNumberConfig.Types
import Types


initialState : ( Types.Model, Cmd Types.Msg )
initialState =
    { stage = 0
    , primeEndPoint = ""
    , image = Nothing
    , toNumberConfig = ToNumberConfig.State.initialState
    , nonPrime = Nothing
    , prime = Types.NothingYet
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
                    max 0 <| min Config.maxStage (model.stage + change)
            in
            { model | stage = newStage }
                |> Cmd.Extra.with
                    (setCssProp ( ".display-panel", "--show-stage", String.fromInt newStage ))

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
                    (requestNonPrime { toNumberConfig = model.toNumberConfig, image = image })

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
            { model | prime = Types.FetchingPrime }
                |> (case model.nonPrime of
                        Just number ->
                            Cmd.Extra.with (Ports.requestPrime ( model.primeEndPoint, number |> NumberString.toString ))

                        Nothing ->
                            Cmd.Extra.pure
                   )

        Types.PrimeGenerated primeResult ->
            { model | prime = primeResult }
                |> Cmd.Extra.with (resizeImageNumber ())
                |> Cmd.Extra.add
                    (case primeResult of
                        Types.PrimeError error ->
                            Ports.logError error

                        _ ->
                            Cmd.none
                    )

        Types.SetPrimeEndPoint newEndpoint ->
            { model | primeEndPoint = newEndpoint }
                |> Cmd.Extra.pure

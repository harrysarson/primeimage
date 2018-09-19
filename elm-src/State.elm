module State exposing
    ( initialState
    , update
    )

import Cmd.Extra
import Config
import Ports
    exposing
        ( fileSelected
        , requestNonPrime
        , resizeImageNumber
        , setCssProp
        )
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
        Types.ChangeStage change ->
            let
                newStage =
                    max 0 <| min Config.maxStage (model.stage + change)
            in
            { model | stage = newStage }
                |> Cmd.Extra.with
                    (setCssProp ( ".display-panel", "--show-stage", String.fromInt newStage ))

        Types.ImageSelected ->
            model
                |> Cmd.Extra.with
                    (fileSelected Config.imageInputId)

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
                |> Cmd.Extra.with (resizeImageNumber Config.nonPrimeImageNumberId)

        Types.NonPrimeError error ->
            { model | nonPrime = Nothing }
                |> Cmd.Extra.with (Ports.logError error)

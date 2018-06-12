module State exposing ( initialState
                      , update
                      )

import Types
import Config
import Ports exposing ( fileSelected
                      , requestNonPrime
                      , prettyPrintState
                      , setInitialValues
                      , resizeImageNumber
                      , setCssProp
                      )

import ToNumberConfig.State

initialState : (Types.Model, Cmd Types.Msg)
initialState =
    ( { stage = 0
      , image = Nothing
      , toNumberConfig = ToNumberConfig.State.initialState
      , nonPrime = Nothing
      }
    , Cmd.batch
        [ setInitialValues ToNumberConfig.State.initialState
        {- }
        , Task.perform Types.ImageRead <|
            Task.succeed
                { contents = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                , filename = "sample"
                }
        , Task.perform Types.ChangeStage <|
            Task.succeed 0
        --}
        ]
    )


update : Types.Msg -> Types.Model -> (Types.Model, Cmd Types.Msg)
update msg model =
    prettyPrintState <|
    case msg of
      Types.ChangeStage change ->
        let
          newStage = max 0 <| min Config.maxStage (model.stage + change)
          setIntialVal =
              if change /= 0 && newStage == 2 then
                  setInitialValues model.toNumberConfig
              else
                  Cmd.none
        in
          ( { model | stage = newStage }
          , Cmd.batch
              [ setIntialVal
              , setCssProp ( ".display-panel", "--show-stage", toString newStage )
              ]
          )
      Types.ImageSelected ->
          ( model
          , fileSelected Config.imageInputId
          )
      Types.ImageRead image ->
          ( { model | image = Just image }
          , requestNonPrime { toNumberConfig = model.toNumberConfig, image = image }
          )
      Types.UpdateNumberConfig updateNumberConfigMsg ->
        let
          toNumberConfig =
              ToNumberConfig.State.update updateNumberConfigMsg model.toNumberConfig
          isError =
              ToNumberConfig.Types.errorsInModel toNumberConfig
                |> List.isEmpty
                |> not
          updatedModel = { model | toNumberConfig = toNumberConfig}
        in
          if isError then
              ( { updatedModel | nonPrime = Nothing }
              , Cmd.none
              )
          else
              ( updatedModel
              , model.image
                  |> Maybe.map (\i -> requestNonPrime { toNumberConfig = toNumberConfig, image = i })
                  |> Maybe.withDefault Cmd.none
              )
      Types.NonPrimeGenerated nonPrime ->
          ( { model | nonPrime = Just nonPrime }
          , resizeImageNumber Config.nonPrimeImageNumberId
          )

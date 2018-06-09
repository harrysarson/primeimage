module State exposing ( initialState
                      , update
                      )

import Task

import Types
import Config
import Ports exposing ( fileSelected
                      , requestNonPrime
                      , prettyPrintState
                      , setInitialValues
                      , resizeImageNumber
                      , setCssProp
                      )

import ToNumberConfig.Types
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
        , Task.perform Types.ImageRead <|
            Task.succeed
                { contents = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                , filename = "sample"
                }
        , Task.perform Types.ChangeStage <|
            Task.succeed 0
        ]
    )


update : Types.Msg -> Types.Model -> (Types.Model, Cmd Types.Msg)
update msg model =
    prettyPrintState <|
    case msg of
      Types.ChangeStage change ->
        let
          newStage = max 0 <| min Config.maxStage model.stage + change
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
      Types.ImageRead data ->
          ( { model | image = Just data }
          , getImgCmd data model.toNumberConfig
          )
      Types.UpdateNumberConfig updateNumberConfigMsg ->
        let
          toNumberConfig =
              ToNumberConfig.State.update updateNumberConfigMsg model.toNumberConfig
          imgCmd =
              model.image
                |> Maybe.map (\i -> getImgCmd i toNumberConfig)
                |> Maybe.withDefault Cmd.none
        in
          ( { model | toNumberConfig = toNumberConfig }
          , imgCmd
          )
      Types.NonPrimeGenerated nonPrime ->
          ( { model | nonPrime = Just nonPrime }
          , resizeImageNumber Config.nonPrimeImageNumberId
          )

getImgCmd : Types.Image -> ToNumberConfig.Types.Model -> Cmd msg
getImgCmd image toNumberConfig =
    requestNonPrime { toNumberConfig = toNumberConfig, image = image }

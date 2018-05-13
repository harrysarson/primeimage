module State exposing (..)

import Types
import Config

initialState : (Types.Model, Cmd Types.Msg)
initialState =
  ( { stage = 0 }
  , Cmd.none
  )


update : Types.Msg -> Types.Model -> (Types.Model, Cmd Types.Msg)
update msg model =
  case msg of
    Types.ChangeStage change ->
      let
        newStage = max 0 <| min Config.stageCount model.stage + change
      in
        ( { model | stage = newStage }
        , Cmd.none )


subscriptions : Types.Model -> Sub Types.Msg
subscriptions model =
  Sub.none


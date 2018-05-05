module State exposing (..)

import Types

initialState : (Types.Model, Cmd Types.Msg)
initialState =
  ( { stage = 0 }
  , Cmd.none
  )


update : Types.Msg -> Types.Model -> (Types.Model, Cmd Types.Msg)
update msg model =
  case msg of
    Types.ChangeStage change ->
      ( { model | stage = model.stage + change }
      , Cmd.none )


subscriptions : Types.Model -> Sub Types.Msg
subscriptions model =
  Sub.none


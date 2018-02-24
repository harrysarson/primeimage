module InteractionPanel.State exposing (..)

import InteractionPanel.Types as Types

initialState : Int -> (Types.Model, Cmd Types.Msg)
initialState stage =
  ( Types.Model stage
  , Cmd.none
  )


update : Types.Msg -> Types.Model -> (Types.Model, Cmd Types.Msg)
update msg model =
  case msg of
    Types.ChangeStage change ->
      ({model | stage = max 0 (model.stage + change)}, Cmd.none)


subscriptions : Types.Model -> Sub Types.Msg
subscriptions model =
  Sub.none


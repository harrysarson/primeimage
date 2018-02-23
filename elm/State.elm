module State exposing (..)

import InteractionPanel.Types
import InteractionPanel.State

import Types

initialState : (Types.Model, Cmd Types.Msg)
initialState =
  ( Types.Model (Tuple.first (InteractionPanel.State.initialState 0))
  , Cmd.none
  )


update : Types.Msg -> Types.Model -> (Types.Model, Cmd Types.Msg)
update msg model =
  case msg of
    Types.InteractionPanel interactionMsg ->
        ( Types.Model (Tuple.first (InteractionPanel.State.update interactionMsg model.interactionPanel))
        , Cmd.none
        )


subscriptions : Types.Model -> Sub Types.Msg
subscriptions model =
  Sub.none


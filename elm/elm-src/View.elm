module View exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import InteractionPanel
import DisplayPanel

import Types


view : Types.Model -> Html Types.Msg
view model =
  node "main" []
    [ InteractionPanel.view { stage = model.stage, change = (\change -> Types.ChangeStage change) }
    , DisplayPanel.view { stage = model.stage }
    ]

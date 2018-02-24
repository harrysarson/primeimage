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
    [ Html.node "link" [ Html.Attributes.rel "stylesheet", Html.Attributes.href "main.css" ] []
    , InteractionPanel.view { stage = model.stage, change = (\change -> Types.ChangeStage change) }
    , DisplayPanel.view { stage = model.stage }
    ]

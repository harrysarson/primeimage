module View exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import InteractionPanel.Types
import InteractionPanel.View

import Types


view : Types.Model -> Html Types.Msg
view model =
  node "main" []
    [ Html.node "link" [ Html.Attributes.rel "stylesheet", Html.Attributes.href "main.css" ] []
    , Html.map Types.InteractionPanel (InteractionPanel.View.view model.interactionPanel)
    , div [] [ div [ class "display-panel stage-selecting" ] [] ]
    ]

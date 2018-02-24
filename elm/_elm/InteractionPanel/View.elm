module InteractionPanel.View exposing (view)

import Array
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import InteractionPanel.Types as Types

instructions = Array.fromList
  [ [ h1 [] [ text "Welcome to Prime Image" ]
    , p []
      [ text "Click "
      , button [ attribute "data-stage-change" "+1" ] [ text "Next" ]
      , text "to begin."
      ]
    ]
  , [ h1 [] [ text "Select Image" ]
    , p [] [ text "First you must select an image to turn into a prime number." ]
    , p [] [ text "Use the box below to open an image." ]
    ]
  ]



view : Types.Model -> Html.Html Types.Msg
view model =
  div [ class "interaction-panel" ]
  [ section [ class "interaction-instructions stage-selecting" ] (Maybe.withDefault [] (Array.get model.stage instructions))
  , div [ class "interaction-interface stage-selecting show-only-selected" ] []
  , div [ class "interaction-control" ]
    [ button
      [ attribute "data-stage-change" "-1"
      , onClick (Types.ChangeStage -1)
      ] [ text "Back" ]
    , button
      [ attribute "data-stage-change" "+1"
      , onClick (Types.ChangeStage 1)
      ] [ text "Next" ]
    ]
  ]

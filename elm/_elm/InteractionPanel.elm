module InteractionPanel exposing (Props, view)

import Array
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Types

type alias Props msg =
  { stage : Int
  , change : Int -> msg
  }

view : Props msg -> Html.Html msg
view props =
  div [ class "interaction-panel" ]
    [ section [ class "interaction-instructions stage-selecting" ] (Maybe.withDefault [] (Array.get props.stage instructions))
    , div [ class "interaction-interface stage-selecting show-only-selected" ] []
    , div [ class "interaction-control" ]
      [ button
        [ attribute "data-stage-change" "-1"
        , onClick (props.change -1)
        ] [ text "Back" ]
      , button
        [ attribute "data-stage-change" "+1"
        , onClick (props.change 1)
        ] [ text "Next" ]
      ]
    ]

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

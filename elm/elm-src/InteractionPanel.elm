module InteractionPanel exposing (Props, view)

import Array
import Html exposing (..)
import Svg
import Html.Attributes exposing (..)
import Svg.Attributes
import Html.Events exposing (..)

import Types

type alias Props msg =
  { stage : Int
  , change : Int -> msg
  }

view : Props msg -> Html.Html msg
view props =
  div [ class "interaction-panel" ]
    [ section
      [ class "interaction-instructions stage-selecting" ]
      (Maybe.withDefault (default_instructions props.stage) (Array.get props.stage instructions))
    , div [ class "interaction-interface stage-selecting" ]
      (Maybe.withDefault [] (Array.get props.stage interactions))
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

-- todo: xmlns="http://www.w3.org/2000/svg"

-- todo: report runtime exception using html class with svg

interactions = Array.fromList
  [ []
  , [ Html.form [ class "image-pick" ]
      [ Svg.svg [ Svg.Attributes.class "icon", Svg.Attributes.width "50", Svg.Attributes.height "43", Svg.Attributes.viewBox "0 0 50 43" ]
        [ Svg.path
          [ Svg.Attributes.d """
              M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0
              .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5
              1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4
              0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4
              0s-.7 1.7 0 2.4l10 11.6z
              """
          ] []
        ]
      , input [ type_ "file", name "files[]", id "file" ] []
      , label [ for "file" ]
        [ strong [] [ text "Choose a file" ]
        , text " or drag it here."
        ]
      ]
    ]
  ]

{-

      <form class="image-pick">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43">
          <path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z">
          </path>
        </svg>
        <input type="file" name="files[]" id="file" />
        <label for="file"><strong>Choose a file</strong> or drag it here.</label>
      </form>
  -}

default_instructions : int -> List(Html msg)
default_instructions stage =
  [ h1 [] [ text "Unknown stage" ]
  , p [] [ text ("Stage " ++ (toString stage) ++ " could not be found") ]
  ]
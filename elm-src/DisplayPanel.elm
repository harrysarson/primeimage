module DisplayPanel exposing (Props, view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Types
import Resources
import Config

type alias Props =
  { stage : Int
  , canGoNext : Bool
  , imagePreview : Maybe Types.Image
  , nonPrimeImage : Maybe Types.ImageNumber
  }


view : Props -> Html.Html Types.Msg
view props =
  div []
    [ div
      [ class "display-panel stage-selecting"
      ]
      ( List.map
        ( div <|
            -- hack because you should not set disabled for a div, replace with a .disabled class
            [ onClick (Types.ChangeStage 1) ]
            ++ if not props.canGoNext then [ attribute "disabled" "" ] else []
        )
        ( displays props )
      )
    ]

displays : Props -> List (List (Html.Html Types.Msg))
displays props =
  let
    imagePreview =
        props.imagePreview
            |> Maybe.withDefault Resources.defaultImage
    nonPrimeImageList =
        props.nonPrimeImage
            |> Maybe.map imageNumber2displayString
            |> Maybe.map text
            |> maybeSingleton
  in
    [ [ span
        [ class "image-number" ]
        [ text <|
            imageNumber2displayString Resources.corpusImageNumber
        ]
      ]
    , [ img
        [ src imagePreview.contents
        , title imagePreview.filename
        ]
        []
      ]
    , [ span
        [ class "image-number"
        , id Config.nonPrimeImageNumberId ]
        nonPrimeImageList
      ]
    ]

maybeSingleton : Maybe a -> List a
maybeSingleton maybe =
    case maybe of
        Just val ->
          [val]
        Nothing ->
          []

imageNumber2rows : Types.ImageNumber -> List String
imageNumber2rows imageNumber =
  let
    { width, number } = imageNumber
  in
    if number == "" then
      []
    else
      String.left width number :: imageNumber2rows { imageNumber | number = (String.dropLeft width number) }

imageNumber2displayString : Types.ImageNumber -> String
imageNumber2displayString imageNumber =
    imageNumber
        |> imageNumber2rows
        |> String.join "\n"

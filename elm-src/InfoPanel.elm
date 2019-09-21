module InfoPanel exposing (view)

import Array
import Config
import File
import Html exposing (Html, br, button, div, h1, input, label, li, p, section, strong, text, ul)
import Html.Attributes exposing (attribute, class, id, name, type_)
import Html.Events exposing (on, onClick)
import Json.Decode as Decode
import Resources
import ToNumberConfig.Types
import ToNumberConfig.View
import Types


view : Html.Html Types.Msg
view =
    div [ class "information-panel" ]
        [ section
            []
            [ h1 [] [ text "Information about primenumber" ]
            , p [] [ text "todo" ]
            ]
        , div
            [ class "interaction-control" ]
            [ div [] []
            , button [ onClick Types.CloseInfo ] [ text "Back" ]
            ]
        ]

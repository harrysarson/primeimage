module ToNumberConfig.View exposing (view)

import Array
import Html exposing (Html, form, input, label, text)
import Html.Attributes exposing (attribute, class, classList, type_, value)
import Html.Events exposing (on, onMouseUp)
import Json.Decode as Decode
import List
import ToNumberConfig.Types as Types


view : Types.Model -> Html Types.Msg
view model =
    let
        levelInputs =
            List.indexedMap
                levelBox
                (Array.toList model.levels)

        children =
            dimensionBox { msg = Types.SetWidth, name = "width" } model.width
                :: levelInputs
    in
    form
        [ class "to-number-config" ]
        children


levelBox : Int -> Types.Errorable -> Html Types.Msg
levelBox level errorable =
    let
        msg =
            Types.SetLevel level

        name =
            "level " ++ String.fromInt (level + 1)

        isError =
            case errorable.error of
                Just _ ->
                    True

                Nothing ->
                    False
    in
    label
        [ classList
            [ ( "error-in-field", isError )
            ]
        ]
        [ text name
        , input
            [ type_ "range"
            , class "to-number-config-input"
            , Html.Attributes.attribute "min" "0"
            , Html.Attributes.attribute "max" "255"
            , attribute "data-input-name" name
            , value errorable.attemptedValue
            , onMouseUp Types.FinishedChanging
            , on
                "input"
                (Decode.map msg (Decode.at [ "target", "value" ] Decode.string))
            ]
            []
        ]


dimensionBox : { msg : String -> Types.Msg, name : String } -> Types.Errorable -> Html Types.Msg
dimensionBox { msg, name } errorable =
    let
        isError =
            case errorable.error of
                Just _ ->
                    True

                Nothing ->
                    False
    in
    label
        [ classList
            [ ( "error-in-field", isError )
            ]
        ]
        [ text name
        , input
            [ type_ "text"
            , class "to-number-config-input"
            , attribute "data-input-name" name
            , value errorable.attemptedValue
            , on
                "input"
                (Decode.map msg (Decode.at [ "target", "value" ] Decode.string))
            ]
            []
        ]

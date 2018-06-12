module ToNumberConfig.View exposing (view)

import List
import Array
import Json.Decode as Decode
import Html exposing (div, input, form, text, Html, label)
import Html.Attributes exposing (class, classList, attribute, type_, name)
import Html.Events exposing (on)

import ToNumberConfig.Types as Types


view : Types.Model -> Html Types.Msg
view model =
  let
    levelInputs =
        List.indexedMap
          (\level -> inputBox { msg = Types.SetLevel level, name = "level " ++ toString (level + 1) })
          (Array.toList model.levels)


    children =
        inputBox { msg = Types.SetWidth, name = "width" } model.width
        :: inputBox { msg = Types.SetHeight, name = "height" } model.height
        :: levelInputs
  in
    form
        [ class "to-number-config" ]
        children



inputBox : { msg : (String -> msg), name : String } -> (Types.Errorable Int) -> Html msg
inputBox { msg, name } errorable =
  let
    isError =
        case errorable.error of
            Just _ -> True
            Nothing -> False
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
            , on
                "input"
                (Decode.map msg (Decode.at ["target", "value"] Decode.string))
            ]
            []
        ]

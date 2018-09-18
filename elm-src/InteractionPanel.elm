module InteractionPanel exposing (Props, view)

import Array
import Config
import Html exposing (Html, br, button, div, h1, input, label, p, section, strong, text)
import Html.Attributes exposing (attribute, class, disabled, for, id, name, type_)
import Html.Events exposing (on, onClick)
import Json.Decode as Decode
import Svg
import Svg.Attributes
import ToNumberConfig.Types
import ToNumberConfig.View
import Types


type alias Props =
    { stage : Int
    , canGoBack : Bool
    , canGoNext : Bool
    , toNumberConfig : ToNumberConfig.Types.Model
    }


view : Props -> Html.Html Types.Msg
view props =
    let
        instruction =
            Array.get props.stage (instructions props)
                |> Maybe.withDefault (default_instructions props.stage)

        interaction =
            Array.get props.stage (interactions props)
                |> Maybe.withDefault []
    in
    div [ class "interaction-panel" ]
        [ section
            [ class "interaction-instructions stage-selecting" ]
            instruction
        , div
            [ class "interaction-interface stage-selecting" ]
            interaction
        , div [ class "interaction-control" ]
            [ stageButton -1 props [ text "Back" ]
            , stageButton 1 props [ text "Next" ]
            ]
        ]


stageButton : Int -> Props -> List (Html Types.Msg) -> Html.Html Types.Msg
stageButton change props =
    let
        enabled =
            if change > 0 then
                props.canGoNext

            else if change < 0 then
                props.canGoBack

            else
                False
    in
    button
        [ attribute "data-stage-change" (String.fromInt change)
        , onClick (Types.ChangeStage change)
        , disabled <| not enabled
        ]


instructions : Props -> Array.Array (List (Html Types.Msg))
instructions props =
    let
        makeErrorP : ( String, String ) -> Html msg
        makeErrorP ( name, errorDescription ) =
            p
                [ class "error-in-field" ]
                [ text <| "Error setting " ++ name ++ ":"
                , br [] []
                , text <| "  " ++ errorDescription
                ]
    in
    Array.fromList
        [ [ h1 [] [ text "Welcome to Prime Image" ]
          , p []
                [ text "Click "
                , stageButton 1 props [ text "Next" ]
                , text " to begin."
                ]
          ]
        , [ h1 [] [ text "Select Image" ]
          , p [] [ text "First you must select an image to turn into a prime number." ]
          , p [] [ text "Use the box below to open an image." ]
          ]
        , h1 [] [ text "Convert Image To Number" ]
            :: p [] [ text "Use the controls below to convert the image to a number." ]
            :: p
                []
                [ text """
                Set the demensions of the number image using width and height,
                although remember that larger numbers may take a very long time
                to convert to a prime.
                """
                ]
            :: p
                []
                [ text ("The " ++ String.fromInt (Array.length props.toNumberConfig.levels) ++ """
                level(s) determine the which pixel values map to each number.
                Play around with these to get the clearest number image.
                """)
                ]
            :: (ToNumberConfig.Types.errorsInModel props.toNumberConfig
                    |> List.map makeErrorP
               )
        , [ h1 [] [ text "Create a Prime Number" ]
          , p [] [ text "Click below to find a prime number similar to the current number."]
          ]
        ]



-- todo: xmlns="http://www.w3.org/2000/svg"


interactions : Props -> Array.Array (List (Html Types.Msg))
interactions props =
    Array.fromList
        [ []
        , [ Html.form
                [ class "image-pick" ]
                [ Svg.svg
                    [ Svg.Attributes.class "icon"
                    , Svg.Attributes.width "50"
                    , Svg.Attributes.height "43"
                    , Svg.Attributes.viewBox "0 0 50 43"
                    ]
                    [ Svg.path
                        [ Svg.Attributes.d """
                    M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0
                    .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5
                    1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4
                    0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4
                    0s-.7 1.7 0 2.4l10 11.6z
                    """
                        ]
                        []
                    ]
                , input
                    [ type_ "file"
                    , name "files[]"
                    , id Config.imageInputId
                    , on "change" <| Decode.succeed Types.ImageSelected
                    ]
                    []
                , label [ for "file" ]
                    [ strong [] [ text "Click here to choose a file" ]
                    ]
                ]
          ]
        , [ Html.map
                Types.UpdateNumberConfig
                (ToNumberConfig.View.view props.toNumberConfig)
          ]
        , [ text "todo - click here" ]
        ]


default_instructions : Int -> List (Html Types.Msg)
default_instructions stage =
    [ h1 [] [ text "Unknown stage" ]
    , p [] [ text ("Stage " ++ String.fromInt stage ++ " could not be found") ]
    ]

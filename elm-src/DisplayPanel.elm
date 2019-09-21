module DisplayPanel exposing (Props, view)

import Config
import Html exposing (Html, button, div, img, span, text)
import Html.Attributes exposing (attribute, class, src, title)
import Html.Events exposing (onClick)
import InfoPanel
import NumberString
import Resources
import Set
import Types


type alias Props =
    { stage : Int
    , canGoNext : Bool
    , imagePreview : Maybe Types.Image
    , nonPrimeImage : Maybe Types.ImageNumber
    , primeImage : Types.LoadedResource Types.ImageNumber
    , showingInfo : Bool
    }


view : Props -> Html Types.Msg
view props =
    let
        menuProps =
            { stage = props.stage }
    in
    div [ class "main-panel" ]
        (List.filterMap
            identity
            [ Just
                (div
                    [ class "display-panel" ]
                    [ div
                        [ class "image-display"
                        ]
                        (List.map
                            (div <|
                                [ onClick (Types.ChangeStage 1) ]
                                    ++ (if not props.canGoNext then
                                            [ class "disabled" ]

                                        else
                                            []
                                       )
                            )
                            (displays props)
                        )
                    , menuView menuProps
                    ]
                )
            , if props.showingInfo then
                Just <| InfoPanel.view

              else
                Nothing
            ]
        )


displays : Props -> List (List (Html Types.Msg))
displays props =
    let
        imagePreview =
            props.imagePreview
                |> Maybe.map
                    (\image ->
                        img
                            [ src image.contents
                            , title image.filename
                            ]
                            []
                    )
                |> Maybe.withDefault Resources.defaultImage

        nonPrimeImageList =
            props.nonPrimeImage
                |> Maybe.map imageNumber2displayString
                |> Maybe.map text
                |> maybeSingleton

        primeImageList =
            case props.primeImage of
                Types.Loaded imageNumber ->
                    [ text (imageNumber2displayString imageNumber) ]

                Types.Loading ->
                    [ div
                        [ class "lds-spinner" ]
                        (List.repeat 12 (div [] []))
                    ]

                Types.NotLoading ->
                    []
    in
    [ [ span
            [ class "image-number"
            , class "auto-resize"
            ]
            [ text <|
                imageNumber2displayString Resources.corpusImageNumber
            ]
      ]
    , [ imagePreview
      ]
    , [ span
            [ class "image-number"
            , class "auto-resize"
            ]
            nonPrimeImageList
      ]
    , [ span
            [ class "image-number"
            , class "auto-resize"
            ]
            primeImageList
      ]
    ]


maybeSingleton : Maybe a -> List a
maybeSingleton maybe =
    case maybe of
        Just val ->
            [ val ]

        Nothing ->
            []


imageNumber2rows : Types.ImageNumber -> List String
imageNumber2rows imageNumber =
    let
        { width, number } =
            imageNumber

        string =
            NumberString.toString number
    in
    if string == "" then
        []

    else
        String.left width string
            :: imageNumber2rows
                { imageNumber
                    | number =
                        String.dropLeft width string
                            |> NumberString.fromString
                }


imageNumber2displayString : Types.ImageNumber -> String
imageNumber2displayString imageNumber =
    imageNumber
        |> imageNumber2rows
        |> String.join "\n"


type alias MenuProps =
    { stage : Int }


menuView : MenuProps -> Html Types.Msg
menuView props =
    div
        [ class "menu-bar" ]
        [ button
            [ attribute "data-clipboard-target"
                (".image-display > div:nth-child("
                    ++ String.fromInt (props.stage + 1)
                    ++ ") > *"
                )
            , class
                (if Set.member props.stage Config.copyableStages then
                    "copy-me"

                 else
                    "disabled"
                )
            ]
            [ text "COPY" ]
        , button
            [ onClick Types.ToggleInfo ]
            [ text "INFO" ]
        ]

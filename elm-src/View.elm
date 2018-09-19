module View exposing (view)

import Config
import DisplayPanel
import Html exposing (Html, node)
import InteractionPanel
import Types


view : Types.Model -> Html Types.Msg
view model =
    let
        -- todo: find a more elegant way to set these props
        canGoNext =
            case model.stage of
                0 ->
                    True

                1 ->
                    model.image /= Nothing

                2 ->
                    True

                3 ->
                    False

                _ ->
                    False

        displayProps =
            { stage = model.stage
            , canGoNext = canGoNext
            , imagePreview = model.image
            , nonPrimeImage = model.nonPrime
            , primeImage = model.prime
            }

        interactionProps =
            { stage = model.stage
            , canGoNext = canGoNext
            , canGoBack = model.stage > 0
            , toNumberConfig = model.toNumberConfig
            }
    in
    node "main"
        []
        [ InteractionPanel.view interactionProps
        , DisplayPanel.view displayProps
        ]

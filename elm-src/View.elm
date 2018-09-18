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
            model.stage < Config.maxStage

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

module View exposing (view)

import Config
import DisplayPanel
import Html exposing (Html, node)
import InteractionPanel
import Lib
import Types


view : Types.Model -> Html Types.Msg
view model =
    let
        -- todo: find a more elegant way to set these props
        canGoNext =
            Lib.saturateStageChange model 1 == 1

        displayProps =
            { stage = model.stage
            , canGoNext = canGoNext
            , imagePreview = model.image
            , nonPrimeImage =
                model.nonPrime
                    |> Maybe.map
                        (\number ->
                            { number = number
                            , width = model.toNumberConfig.width.value
                            }
                        )
            , primeImage =
                case model.prime of
                    Types.ProbablyPrime number ->
                        Types.Loaded { number = number, width = model.toNumberConfig.width.value }

                    Types.DefinatelyPrime number ->
                        Types.Loaded { number = number, width = model.toNumberConfig.width.value }

                    Types.FetchingPrime ->
                        Types.Loading

                    _ ->
                        Types.NotLoading
            }

        interactionProps =
            { stage = model.stage
            , canGoNext = canGoNext
            , canGoBack = Lib.saturateStageChange model -1 == -1
            , toNumberConfig = model.toNumberConfig
            , primeEndPoint = model.primeEndPoint
            , primeError =
                case model.prime of
                    Types.PrimeError e ->
                        Just e

                    _ ->
                        Nothing
            , fetchingPrime =
                case model.prime of
                    Types.FetchingPrime ->
                        True

                    _ ->
                        False
            }
    in
    node "main"
        []
        [ InteractionPanel.view interactionProps
        , DisplayPanel.view displayProps
        ]

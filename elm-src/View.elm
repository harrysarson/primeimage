module View exposing (view)

import DisplayPanel
import Html exposing (Html, node)
import InteractionPanel
import Lib
import ToNumberConfig.State
import Types


view : Types.Model -> Html Types.Msg
view model =
    let
        -- todo: find a more elegant way to set these props
        canGoNext =
            Lib.saturateStageChange model 1 == 1

        toNumberConfig =
            Maybe.withDefault ToNumberConfig.State.initialState model.toNumberConfig

        displayProps =
            { stage = model.stage
            , canGoNext = canGoNext
            , imagePreview = model.image
            , nonPrimeImage =
                model.nonPrime
                    |> Maybe.map
                        (\number ->
                            { number = number
                            , width = toNumberConfig.width.value
                            }
                        )
            , primeImage =
                case model.prime of
                    Just (Types.FoundPrime { primeNumber }) ->
                        Types.Loaded { number = primeNumber, width = toNumberConfig.width.value }

                    Just (Types.InProgress _) ->
                        Types.Loading

                    Just (Types.PrimeError _) ->
                        Types.NotLoading

                    Nothing ->
                        Types.NotLoading
            , showingInfo =
                model.showingInfo
            }

        interactionProps =
            { stage = model.stage
            , canGoNext = canGoNext
            , canGoBack = Lib.saturateStageChange model -1 == -1
            , toNumberConfig = toNumberConfig
            , primeError =
                case model.prime of
                    Just (Types.PrimeError e) ->
                        Just e

                    _ ->
                        Nothing
            , fetchingPrime =
                case model.prime of
                    Just (Types.InProgress _) ->
                        True

                    _ ->
                        False
            , primeFoundLog2Prob =
                case model.prime of
                    Just (Types.FoundPrime { log2ProbPrime }) ->
                        Just log2ProbPrime

                    _ ->
                        Nothing
            }
    in
    node "main"
        []
        [ InteractionPanel.view interactionProps
        , DisplayPanel.view displayProps
        ]

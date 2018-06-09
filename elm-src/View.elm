module View exposing (view)

import Html exposing (Html, node)

import InteractionPanel
import DisplayPanel

import Config
import Types


view : Types.Model -> Html Types.Msg
view model =
  let
    -- todo: find a more elegant way to set these props
    canGoNext = model.stage < Config.maxStage
    displayProps =
      { stage = model.stage
      , canGoNext = canGoNext
      , imagePreview = model.image
      , nonPrimeImage = model.nonPrime
      }
    interactionProps =
      { stage = model.stage
      , canGoNext = canGoNext
      , canGoBack = model.stage > 0
      , numberConfig = model.toNumberConfig
      }
  in
    node "main" []
      [ InteractionPanel.view interactionProps
      , DisplayPanel.view displayProps
      ]

module Types exposing (..)

import Http

import InteractionPanel.Types

type alias Model =
  { interactionPanel : InteractionPanel.Types.Model
  }


type Msg
  = InteractionPanel InteractionPanel.Types.Msg

module Types exposing (..)

import Http

type alias Model =
  { stage : Int
  }


type Msg
  = ChangeStage Int

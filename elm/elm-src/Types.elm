module Types exposing (..)


type alias Model =
  { stage : Int
  }


type Msg
  = ChangeStage Int

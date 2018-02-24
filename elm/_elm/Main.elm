module Main exposing (main)

import Html

import Types
import State
import View


main : Program Never Types.Model Types.Msg
main =
    Html.program
        { init = State.initialState
        , update = State.update
        , subscriptions = State.subscriptions
        , view = View.view
        }
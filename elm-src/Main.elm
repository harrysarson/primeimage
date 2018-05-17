module Main exposing (main)

import Html

import Types
import State exposing (initialState, update)
import View exposing (view)
import Subscriptions exposing (subscriptions)


main : Program Never Types.Model Types.Msg
main =
    Html.program
        { init = initialState
        , update = update
        , subscriptions = subscriptions
        , view = view
        }
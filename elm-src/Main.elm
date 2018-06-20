module Main exposing (main)

import Html
import State exposing (initialState, update)
import Subscriptions exposing (subscriptions)
import Types
import View exposing (view)


main : Program Never Types.Model Types.Msg
main =
    Html.program
        { init = initialState
        , update = update
        , subscriptions = subscriptions
        , view = view
        }

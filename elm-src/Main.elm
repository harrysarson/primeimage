module Main exposing (main)

import Browser
import State exposing (initialState, update)
import Subscriptions exposing (subscriptions)
import Types
import View exposing (view)


main : Program () Types.Model Types.Msg
main =
    Browser.document
        { init = \() -> initialState
        , update = update
        , subscriptions = subscriptions
        , view =
            \model ->
                { title = "Prime Image"
                , body = [ view model ]
                }
        }

module Subscriptions exposing (subscriptions)

import Array
import Browser.Events
import Json.Decode
import NumberString
import Ports
import Types


keyDecoder : Json.Decode.Decoder Types.Msg
keyDecoder =
    Json.Decode.map toDirection (Json.Decode.field "key" Json.Decode.string)


toDirection : String -> Types.Msg
toDirection string =
    case string of
        "ArrowUp" ->
            Types.ChangeStage -1

        "ArrowDown" ->
            Types.ChangeStage 1

        _ ->
            Types.Noop


subscriptions : Types.Model -> Sub Types.Msg
subscriptions _ =
    Sub.batch
        [ Ports.nonPrimeGenerated
            (\{ nonPrime, width, levels } ->
                Types.NonPrimeGenerated
                    (NumberString.fromString nonPrime)
                    { width = { value = width, attemptedValue = String.fromInt width, error = Nothing }
                    , levels =
                        levels
                            |> Array.fromList
                            |> Array.map (\level -> { value = level, attemptedValue = String.fromInt level, error = Nothing })
                    }
            )
        , Ports.nonPrimeError Types.NonPrimeError
        , Ports.onPrimeResponse Types.PrimeResponse
        , Browser.Events.onKeyDown keyDecoder
        ]

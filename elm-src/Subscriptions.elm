module Subscriptions exposing (subscriptions)

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
subscriptions model =
    Sub.batch
        [ Ports.fileContentRead Types.ImageRead
        , Ports.nonPrimeGenerated (NumberString.fromString >> Types.NonPrimeGenerated)
        , Ports.nonPrimeError Types.NonPrimeError
        , Ports.probablyPrimeGenerated (NumberString.fromString >> Types.ProbablyPrime >> Types.PrimeGenerated)
        , Ports.definatelyPrimeGenerated (NumberString.fromString >> Types.DefinatelyPrime >> Types.PrimeGenerated)
        , Ports.requestPrimeError (Types.PrimeError >> Types.PrimeGenerated)
        , Browser.Events.onKeyDown keyDecoder
        ]

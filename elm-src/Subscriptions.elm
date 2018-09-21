module Subscriptions exposing (subscriptions)

import NumberString
import Ports
import Types


subscriptions : Types.Model -> Sub Types.Msg
subscriptions model =
    Sub.batch
        [ Ports.fileContentRead Types.ImageRead
        , Ports.nonPrimeGenerated (NumberString.fromString >> Types.NonPrimeGenerated)
        , Ports.nonPrimeError Types.NonPrimeError
        , Ports.probablyPrimeGenerated (NumberString.fromString >> Types.ProbablyPrime >> Types.PrimeGenerated)
        , Ports.definatelyPrimeGenerated (NumberString.fromString >> Types.DefinatelyPrime >> Types.PrimeGenerated)
        , Ports.requestPrimeError (Types.PrimeError >> Types.PrimeGenerated)
        ]

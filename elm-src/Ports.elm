port module Ports exposing
    ( definatelyPrimeGenerated
    , fileContentRead
    , fileSelected
    , logError
    , nonPrimeError
    , nonPrimeGenerated
    , onPrimeResponse
    , probablyPrimeGenerated
    , requestNonPrime
    , requestPrime
    , requestPrimeError
    , resizeImageNumber
    , setCssProp
    )

import Json.Decode
import Json.Encode
import ToNumberConfig.Types
import Types


{-| Allow file upload on click
credit to <https://www.paramander.com/blog/using-ports-to-deal-with-files-in-elm-0-17>
-}
port fileSelected : String -> Cmd msg


port fileContentRead : (Types.Image -> msg) -> Sub msg


port requestNonPrime : { toNumberConfig : ToNumberConfig.Types.Model, image : Types.Image } -> Cmd msg


port nonPrimeGenerated : (String -> msg) -> Sub msg


{-| requestPrime (url, nonPrimeNumber) = ...
-}



-- port requestPrime : ( String, String ) -> Cmd msg


port requestPrimeError : (String -> msg) -> Sub msg


port definatelyPrimeGenerated : (String -> msg) -> Sub msg


port probablyPrimeGenerated : (String -> msg) -> Sub msg


port nonPrimeError : (String -> msg) -> Sub msg


port logError : String -> Cmd msg


port resizeImageNumber : () -> Cmd msg


{-| setCssProp (selector, prop, value) = ...
-}
port setCssProp : ( String, String, String ) -> Cmd msg


port requestPrime : Json.Encode.Value -> Cmd never


port onPrimeResponse : (Json.Decode.Value -> msg) -> Sub msg

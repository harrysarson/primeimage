port module Ports exposing
    ( logError
    , nonPrimeError
    , nonPrimeGenerated
    , onPrimeResponse
    , requestNonPrime
    , requestPrime
    , resizeImageNumber
    , setCssProp
    )

import Json.Decode
import Json.Encode
import ToNumberConfig.Types
import Types


port requestNonPrime :
    { toNumberConfig : ToNumberConfig.Types.Model
    , image : Types.Image
    } -> Cmd msg


port nonPrimeGenerated : (String -> msg) -> Sub msg


port nonPrimeError : (String -> msg) -> Sub msg


port logError : String -> Cmd msg


port resizeImageNumber : () -> Cmd msg


{-| setCssProp (selector, prop, value) = ...
-}
port setCssProp : ( String, String, String ) -> Cmd msg


port requestPrime : Json.Encode.Value -> Cmd never


port onPrimeResponse : (Json.Decode.Value -> msg) -> Sub msg

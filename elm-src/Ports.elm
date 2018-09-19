port module Ports exposing
    ( fileContentRead
    , fileSelected
    , logError
    , nonPrimeError
    , nonPrimeGenerated
    , primeGenerated
    , requestNonPrime
    , requestPrime
    , resizeImageNumber
    , setCssProp
    )

import ToNumberConfig.Types
import Types


{-| Allow file upload on click
credit to <https://www.paramander.com/blog/using-ports-to-deal-with-files-in-elm-0-17>
-}
port fileSelected : String -> Cmd msg


port fileContentRead : (Types.Image -> msg) -> Sub msg


port requestNonPrime : { toNumberConfig : ToNumberConfig.Types.Model, image : Types.Image } -> Cmd msg


port nonPrimeGenerated : (Types.ImageNumber -> msg) -> Sub msg


port requestPrime : String -> Cmd msg


port primeGenerated : (String -> msg) -> Sub msg


port nonPrimeError : (String -> msg) -> Sub msg


port logError : String -> Cmd msg


port resizeImageNumber : String -> Cmd msg



--                 selector prop    value


port setCssProp : ( String, String, String ) -> Cmd msg

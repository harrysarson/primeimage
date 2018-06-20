port module Ports
    exposing
        ( fileContentRead
        , fileSelected
        , logError
        , nonPrimeError
        , nonPrimeGenerated
        , prettyPrintState
        , requestNonPrime
        , resizeImageNumber
        , setCssProp
        , setInitialValues
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


port nonPrimeError : (String -> msg) -> Sub msg


prettyPrintState : ( Types.Model, Cmd msg ) -> ( Types.Model, Cmd msg )
prettyPrintState ( model, msg ) =
    ( model, Cmd.batch [ msg, ppState model ] )


port ppState : Types.Model -> Cmd msg


port logError : String -> Cmd msg


port setInitialValues : ToNumberConfig.Types.Model -> Cmd msg


port resizeImageNumber : String -> Cmd msg



--                 selector prop    value


port setCssProp : ( String, String, String ) -> Cmd msg

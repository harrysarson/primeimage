port module Ports exposing  ( fileSelected
                            , fileContentRead
                            , requestNonPrime
                            , nonPrimeGenerated
                            , prettyPrintState
                            , setInitialValues
                            , resizeImageNumber
                            )
import Types
import ToNumberConfig.Types

{-| Allow file upload on click
    credit to https://www.paramander.com/blog/using-ports-to-deal-with-files-in-elm-0-17
-}

port fileSelected : String -> Cmd msg
port fileContentRead : (Types.Image -> msg) -> Sub msg


port requestNonPrime : { toNumberConfig : ToNumberConfig.Types.Model, image : Types.Image } -> Cmd msg
port nonPrimeGenerated : (Types.ImageNumber -> msg) -> Sub msg

prettyPrintState : (Types.Model, Cmd msg) -> (Types.Model, Cmd msg)
prettyPrintState ( model, msg ) =
    ( model, Cmd.batch [msg, ppState model] )

port ppState : Types.Model -> Cmd msg

port setInitialValues : ToNumberConfig.Types.Model -> Cmd msg

port resizeImageNumber : String -> Cmd msg

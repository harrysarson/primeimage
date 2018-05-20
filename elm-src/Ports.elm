port module Ports exposing  ( fileSelected
                            , fileContentRead
                            )
import Types

{-| Allow file upload on click
    credit to https://www.paramander.com/blog/using-ports-to-deal-with-files-in-elm-0-17
-}

port fileSelected : String -> Cmd msg
port fileContentRead : (Types.Image -> msg) -> Sub msg

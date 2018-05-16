port module ImageUploadPort exposing  ( fileSelected
                                      , fileContentRead
                                      )
import Types

port fileSelected : String -> Cmd msg

port fileContentRead : (Types.Image -> msg) -> Sub msg

-- credit to https://www.paramander.com/blog/using-ports-to-deal-with-files-in-elm-0-17
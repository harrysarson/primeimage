module Subscriptions exposing (subscriptions)

import ImageUploadPort exposing (fileContentRead)
import Types

subscriptions : Types.Model -> Sub Types.Msg
subscriptions model =
  fileContentRead Types.ImageRead

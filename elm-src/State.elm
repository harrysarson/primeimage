module State exposing ( initialState
                      , update
                      , subscriptions
                      )

import Types
import Config
import Ports exposing (fileSelected)

initialState : (Types.Model, Cmd Types.Msg)
initialState =
  ( { stage = 0
    , image = Nothing
    }
  , Cmd.none
  )


update : Types.Msg -> Types.Model -> (Types.Model, Cmd Types.Msg)
update msg model =
  case msg of
    Types.ChangeStage change ->
      let
        newStage = max 0 <| min Config.stageCount model.stage + change
      in
        ( { model | stage = newStage }
        , Cmd.none )
    Types.ImageSelected ->
      ( model
      , fileSelected Config.imageInputId
      )
    Types.ImageRead data ->
      let
        newImage =
          { contents = data.contents
          , filename = data.filename
          }
      in
        ( { model | image = Just newImage }
        , Cmd.none
        )



subscriptions : Types.Model -> Sub Types.Msg
subscriptions model =
  Sub.none


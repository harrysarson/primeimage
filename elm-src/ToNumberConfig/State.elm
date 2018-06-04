module ToNumberConfig.State exposing ( initialState
                                     , update
                                     )

import Array
import Json.Decode as Decode

import ToNumberConfig.Types as Types exposing (Errorable, makeErrorable)
import ToNumberConfig.Config as Config

initialState : Types.Model
initialState =
    { width = makeErrorable 100
    , height = makeErrorable  100
    , levels = List.range 1 Config.numberOfLevels
       |> List.map (\x -> toFloat (x * Config.maxLevel) / toFloat(Config.numberOfLevels + 1))
       |> List.map round
       |> List.map makeErrorable
       |> Array.fromList
    }


update : Types.Msg -> Types.Model -> Types.Model
update msg model =
    case msg of
        Types.SetWidth widthStr ->
            { model
            | width = updateErrorable (validateSize "width") widthStr model.width
            }
        Types.SetHeight heightStr ->
            { model
            | height = updateErrorable (validateSize "height") heightStr model.height
            }
        Types.SetLevel index levelStr ->
            Array.get index model.levels
              |> Maybe.map (\oldLevel -> updateErrorable validateLevel levelStr oldLevel)
              |> Maybe.map (\newLevel -> { model | levels = Array.set index newLevel model.levels })
              |> Maybe.withDefault model


validateSize : String -> Int -> Result String Int
validateSize dimName width =
    if width >= 0 && width <= Config.maxImageSize
        then Ok width
        else Err (dimName ++ " must be positive integer less than " ++ toString Config.maxImageSize)


validateLevel : Int -> Result String Int
validateLevel level =
    if level >= 0 && level <= Config.maxLevel
        then Ok level
        else Err ("level must be positive integer less than " ++ toString Config.maxLevel)


updateErrorable : (Int -> Result String Int) -> String -> (Errorable Int) -> (Errorable Int)
updateErrorable validate attemptedValue errorable =
    let
      parsedSize = attemptedValue
          |> Decode.decodeString Decode.int
          |> Result.andThen validate
    in
      case parsedSize of
          Ok size ->
              { value = size
              , attemptedValue = Just attemptedValue
              , error = Nothing
              }
          Err err ->
              { value = errorable.value
              , attemptedValue = Just attemptedValue
              , error = Just err
              }


setAttempted : String -> Errorable a -> Errorable a
setAttempted attemptedValue errorable =
  { errorable | attemptedValue = Just attemptedValue }

module ToNumberConfig.State exposing
    ( initialState
    , update
    )

import Array
import Cmd.Extra
import Json.Decode as Decode
import Process
import Task
import ToNumberConfig.Config as Config
import ToNumberConfig.Types as Types exposing (Errorable, makeErrorable)


initialState : Types.Model
initialState =
    { width = makeErrorable 50
    , levels =
        List.range 1 Config.numberOfLevels
            |> List.map (\x -> toFloat (x * Config.maxLevel) / toFloat (Config.numberOfLevels + 1))
            |> List.map round
            |> List.map makeErrorable
            |> Array.fromList
    }


update : Types.Msg -> Types.Model -> ( Types.Model, Cmd Types.Msg )
update msg model =
    case msg of
        Types.SetWidth widthStr ->
            { model
                | width = updateErrorable (validateSize "width") widthStr model.width
            }
                |> Cmd.Extra.pure

        Types.SetLevel index levelStr ->
            Array.get index model.levels
                |> Maybe.map (\oldLevel -> updateErrorable validateLevel levelStr oldLevel)
                |> Maybe.map (\newLevel -> { model | levels = Array.set index newLevel model.levels })
                |> Maybe.withDefault model
                |> Cmd.Extra.pure

        Types.FinishedChanging ->
            model
                |> Cmd.Extra.with
                    (Task.perform
                        (always Types.ReorderLevels)
                        (Process.sleep 500)
                    )

        Types.ReorderLevels ->
            { model
                | levels =
                    model.levels
                        |> Array.toList
                        |> List.sortBy .value
                        |> Array.fromList
            }
                |> Cmd.Extra.pure


validateSize : String -> Int -> Result String Int
validateSize dimName width =
    if width > 0 && width <= Config.maxImageSize then
        Ok width

    else
        Err (dimName ++ " must be positive integer less than " ++ String.fromInt Config.maxImageSize)


validateLevel : Int -> Result String Int
validateLevel level =
    if level >= 0 && level <= Config.maxLevel then
        Ok level

    else
        Err ("level must be positive integer less than " ++ String.fromInt Config.maxLevel)


updateErrorable : (Int -> Result String Int) -> String -> Errorable -> Errorable
updateErrorable validate attemptedValue errorable =
    let
        parsedSize =
            attemptedValue
                |> Decode.decodeString Decode.int
                |> Result.mapError (\_ -> "Please enter an integer")
                |> Result.andThen validate
    in
    case parsedSize of
        Ok size ->
            { value = size
            , attemptedValue = attemptedValue
            , error = Nothing
            }

        Err err ->
            { value = errorable.value
            , attemptedValue = attemptedValue
            , error = Just err
            }


setAttempted : String -> Errorable -> Errorable
setAttempted attemptedValue errorable =
    { errorable | attemptedValue = attemptedValue }

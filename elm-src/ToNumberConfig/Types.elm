module ToNumberConfig.Types exposing
    ( Errorable
    , Model
    , Msg(..)
    , errorsInModel
    , makeErrorable
    )

import Array exposing (Array)
import Lib.FilterMaybes exposing (filterMaybes)


type alias Model =
    { width : Errorable
    , height : Errorable
    , levels : Array Errorable
    }


type alias Errorable =
    { value : Int
    , attemptedValue : String
    , error : Maybe String
    }


type Msg
    = SetWidth String
    | SetHeight String
    | SetLevel Int String
    | FinishedChanging
    | ReorderLevels


makeErrorable : Int -> Errorable
makeErrorable value =
    { value = value
    , attemptedValue = String.fromInt value
    , error = Nothing
    }


errorsInModel : Model -> List ( String, String )
errorsInModel model =
    let
        errorTuple name =
            .error
                >> Maybe.map (\error -> ( name, error ))
    in
    (model.width |> errorTuple "width")
        :: (model.height |> errorTuple "height")
        :: (model.levels
                |> Array.indexedMap
                    (\index level ->
                        level |> errorTuple ("level " ++ String.fromInt (index + 1))
                    )
                |> Array.toList
           )
        |> filterMaybes

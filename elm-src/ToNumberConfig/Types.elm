module ToNumberConfig.Types exposing ( Model
                                     , Msg(..)
                                     , Errorable
                                     , makeErrorable
                                     , errorsInModel
                                     )

import Array exposing (Array)

import Lib.FilterMaybes exposing (filterMaybes)


type alias Model =
    { width : Errorable Int
    , height: Errorable Int
    , levels: Array (Errorable Int)
    }


type alias Errorable a =
    { value : a
    , attemptedValue : String
    , error : Maybe String
    }


type Msg
    = SetWidth String
    | SetHeight String
    | SetLevel Int String


makeErrorable : a -> Errorable a
makeErrorable value =
    { value = value
    , attemptedValue = toString value
    , error = Nothing
    }


errorsInModel : Model -> List ( String, String )
errorsInModel model =
  let
    errorTuple : String -> Errorable a -> Maybe ( String, String )
    errorTuple name =
        .error
          >> Maybe.map (\error -> ( name,  error ))
  in
    (model.width |> errorTuple "width")
    :: (model.height |> errorTuple "height")
    :: (model.levels
          |> Array.indexedMap (\index level ->
                level |> errorTuple ("level " ++ toString (index + 1))
            )
          |> Array.toList
        )
       |> filterMaybes


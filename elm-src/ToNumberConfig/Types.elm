module ToNumberConfig.Types exposing ( Model
                                     , Msg(..)
                                     , Errorable
                                     , makeErrorable
                                     )

import Array exposing (Array)


type alias Model =
    { width : Errorable Int
    , height: Errorable Int
    , levels: Array (Errorable Int)
    }

type alias Errorable a =
    { value : a
    , attemptedValue : Maybe String
    , error : Maybe String
    }

makeErrorable : a -> Errorable a
makeErrorable value =
    { value = value
    , attemptedValue = Just (toString value)
    , error = Nothing
    }

type Msg
    = SetWidth String
    | SetHeight String
    | SetLevel Int String

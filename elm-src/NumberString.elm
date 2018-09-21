module NumberString exposing (T(..), fromString, toString)


type T
    = NumberString String


fromString : String -> T
fromString =
    NumberString


toString : T -> String
toString (NumberString string) =
    string

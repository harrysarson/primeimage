module Lib.FilterMaybes exposing (filterMaybes)


filterMaybes : List (Maybe a) -> List a
filterMaybes list =
    case headAndTail list of
      Just ( Just head, tail ) ->
          head :: filterMaybes tail
      Just ( Nothing, tail ) ->
          filterMaybes tail
      Nothing ->
          []


headAndTail : List a -> Maybe ( a, List a )
headAndTail list =
    List.head list
      |> Maybe.map (\head ->
          List.tail list
            |> Maybe.map (\tail -> ( head, tail ))
            |> Maybe.withDefault ( head, [] ) -- cannot happen
      )

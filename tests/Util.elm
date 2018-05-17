module Util exposing (queryInOrder)

import Test.Html.Query exposing (Single, Multiple, index, count)
import Expect exposing (Expectation)


queryInOrder : List (Single msg -> Expectation) -> Multiple msg -> Expectation
queryInOrder expectors =
  Expect.all
    ([count (Expect.equal (List.length expectors))]
    ++ List.indexedMap
      (\i -> \expector -> index i >> expector)
      expectors
    )

module Util exposing (queryInOrder, stringGen, randomBool)

import Char
import Expect exposing (Expectation)
import Random exposing (Generator)
import Test.Html.Query exposing (Multiple, Single, count, index)


queryInOrder : List (Single msg -> Expectation) -> Multiple msg -> Expectation
queryInOrder expectors =
    Expect.all
        ([ count (Expect.equal (List.length expectors)) ]
            ++ List.indexedMap
                (\i -> \expector -> index i >> expector)
                expectors
        )


{-| Generate a random string of a given length with a given character generator
fiveLetterEnglishWord = string 5 Random.Char.english
-}
stringOfLengthGen : Int -> Generator String
stringOfLengthGen stringLength =
    Random.map
        String.fromList
        (Random.list stringLength
            (Random.map
                Char.fromCode
                (Random.int (Char.toCode 'a') (Char.toCode 'z'))
            )
        )


{-| Generates a random string of random length given the minimum length
and maximum length and a given character generator.
-}
stringGen : Int -> Int -> Generator String
stringGen minLength maxLength =
    Random.andThen
        (\len -> stringOfLengthGen len)
        (Random.int minLength maxLength)


randomBool : Random.Generator Bool
randomBool =
    Random.map (\n -> n == 0) (Random.int 0 1)

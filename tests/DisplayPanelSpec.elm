module DisplayPanelSpec exposing (tests)

import DisplayPanel exposing (Props, view)
import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer)
import Random
import Resources
import Shrink
import State
import Test exposing (Test, describe, fuzz)
import Test.Html.Event as Event
import Test.Html.Query as Query
import Test.Html.Selector exposing (class, tag)
import Types
import NumberString
import Util exposing (queryInOrder, randomBool)


props : Fuzzer Props
props =
    let
        sampleNonPrimeImage =
            { number = NumberString.fromString "112412412412412412512368346936"
            , width = 3
            }

        displayImage =
            { filename = "Test image"
            , contents = "A data url"
            }

        constructProps state canGoNext imagePreview nonPrimeImage primeImage =
            { stage = state
            , canGoNext = canGoNext
            , imagePreview = imagePreview
            , nonPrimeImage = nonPrimeImage
            , primeImage = primeImage
            }

        generator : Random.Generator Props
        generator =
            Random.map5
                constructProps
                (Random.int 0 10)
                randomBool
                (Random.constant (Just displayImage))
                (Random.constant (Just sampleNonPrimeImage))
                (Random.constant (Types.Loaded sampleNonPrimeImage))

        shrinker =
            \{ stage, canGoNext, imagePreview, nonPrimeImage, primeImage } ->
                Shrink.map constructProps (Shrink.int stage)
                    |> Shrink.andMap (Shrink.bool canGoNext)
                    |> Shrink.andMap (Shrink.noShrink imagePreview)
                    |> Shrink.andMap (Shrink.noShrink nonPrimeImage)
                    |> Shrink.andMap (Shrink.noShrink primeImage)
    in
    Fuzz.custom
        generator
        shrinker


tests : Test
tests =
    describe "DisplayPanel"
        [ fuzz props "classes" <|
            view
                >> Query.fromHtml
                >> Expect.all
                    [ Query.children []
                        >> Expect.all
                            [ Query.count (Expect.equal 1)
                            , Query.first
                                >> Query.has [ class "display-panel" ]
                            ]
                    ]
        , fuzz props "Displays should have the correct contents" <|
            view
                >> Query.fromHtml
                >> Query.find [ class "display-panel" ]
                >> Query.children []
                >> queryInOrder
                    [ Query.find [ class "image-number" ]
                        >> Query.find [ tag "text" ]
                        >> (\_ -> Expect.pass)
                    , Query.find [ tag "img" ]
                        >> (\_ -> Expect.pass)
                    , Query.find [ class "image-number" ]
                        >> Query.find [ tag "text" ]
                        >> (\_ -> Expect.pass)
                    , Query.find [ class "image-number" ]
                        >> Query.find [ tag "text" ]
                        >> (\_ -> Expect.pass)
                    ]
        ]

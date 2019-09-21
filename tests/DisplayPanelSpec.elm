module DisplayPanelSpec exposing (tests)

import DisplayPanel exposing (Props, view)
import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer)
import NumberString
import Random
import Random.Extra
import Resources
import Shrink
import State
import Test exposing (Test, describe, fuzz)
import Test.Html.Event as Event
import Test.Html.Query as Query
import Test.Html.Selector exposing (class, tag)
import Types
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

        constructProps state canGoNext nonPrimeImage primeImage showingInfo =
            { stage = state
            , canGoNext = canGoNext
            , imagePreview = Just displayImage
            , nonPrimeImage = nonPrimeImage
            , primeImage = primeImage
            , showingInfo = showingInfo
            }

        generator : Random.Generator Props
        generator =
            Random.map5
                constructProps
                (Random.int 0 10)
                randomBool
                (Random.constant (Just sampleNonPrimeImage))
                (Random.constant (Types.Loaded sampleNonPrimeImage))
                Random.Extra.bool

        shrinker =
            \{ stage, canGoNext, nonPrimeImage, primeImage, showingInfo } ->
                Shrink.map constructProps (Shrink.int stage)
                    |> Shrink.andMap (Shrink.bool canGoNext)
                    |> Shrink.andMap (Shrink.noShrink nonPrimeImage)
                    |> Shrink.andMap (Shrink.noShrink primeImage)
                    |> Shrink.andMap (Shrink.bool showingInfo)
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
                    [ Query.has [ class "main-panel" ]
                    , Query.children []
                        >> Expect.all
                            [ Query.count (Expect.equal if pr)
                            , Query.index 0
                                >> Query.has [ class "display-panel" ]
                            , Query.index 0
                                >> Query.children []
                                >> Expect.all
                                    [ Query.count (Expect.equal 2)
                                    , Query.index 0
                                        >> Query.has [ class "image-display" ]
                                    , Query.index 1
                                        >> Query.has [ class "menu-bar" ]
                                    ]
                            , Query.index 1
                                >> Query.has [ class "information-panel" ]
                            ]
                    ]
        , fuzz props "Displays should have the correct contents" <|
            view
                >> Query.fromHtml
                >> Query.find [ class "image-display" ]
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

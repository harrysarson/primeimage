module InteractionPanelSpec exposing (tests)

import Array
import Config
import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer)
import Html.Attributes as Attr
import InteractionPanel exposing (Props, view)
import Random
import Random.Extra
import Shrink
import State
import Test exposing (Test, describe, fuzz)
import Test.Html.Event as Event
import Test.Html.Query as Query
import Test.Html.Selector exposing (attribute, class, disabled, id, tag)
import ToNumberConfig.Types exposing (makeErrorable)
import Types
import Util exposing (queryInOrder, randomBool)


props : Fuzzer Props
props =
    let
        sampleToNumberConfig =
            { width = makeErrorable 56
            , levels =
                [ 5, 124, 200 ]
                    |> List.map makeErrorable
                    |> Array.fromList
            }

        generator =
            Random.map
                Props
                (Random.int 0 Config.maxStage)
                |> Random.Extra.andMap randomBool
                |> Random.Extra.andMap randomBool
                |> Random.Extra.andMap (Random.constant sampleToNumberConfig)
                |> Random.Extra.andMap (Random.constant "prime end point")
                |> Random.Extra.andMap (Random.constant Nothing)
                |> Random.Extra.andMap Random.Extra.bool

        shrinker =
            \{ stage, canGoBack, canGoNext, toNumberConfig, primeEndPoint, primeError, fetchingPrime } ->
                Shrink.map Props (Shrink.int stage)
                    |> Shrink.andMap (Shrink.bool canGoBack)
                    |> Shrink.andMap (Shrink.bool canGoNext)
                    |> Shrink.andMap (Shrink.noShrink toNumberConfig)
                    |> Shrink.andMap (Shrink.noShrink primeEndPoint)
                    |> Shrink.andMap (Shrink.maybe Shrink.noShrink primeError)
                    |> Shrink.andMap (Shrink.bool fetchingPrime)
    in
    Fuzz.custom generator shrinker


tests : Test
tests =
    describe "InteractionPanel"
        [ fuzz props "classes" <|
            view
                >> Query.fromHtml
                >> Expect.all
                    [ Query.has [ class "interaction-panel" ]
                    , Query.children []
                        >> queryInOrder
                            [ Query.has [ class "interaction-instructions" ]
                            , Query.has [ class "interaction-interface" ]
                            , Query.has [ class "interaction-control" ]
                            ]
                    ]
        , fuzz props "Should have header" <|
            view
                >> Query.fromHtml
                >> Query.find [ tag "h1" ]
                >> (\_ -> Expect.pass)
        , fuzz props "Stage 0 should have no interaction" <|
            \p ->
                view { p | stage = 0 }
                    |> Query.fromHtml
                    |> Query.find [ class "interaction-interface" ]
                    |> Query.children []
                    |> Query.count (Expect.equal 0)
        , fuzz props "Stage 1 should have file loader interaction" <|
            \p ->
                view { p | stage = 1 }
                    |> Query.fromHtml
                    |> Query.find [ class "interaction-interface" ]
                    |> Query.find [ tag "form" ]
                    |> Expect.all
                        [ Query.has [ class "image-pick" ]
                        , Query.find [ tag "input" ]
                            >> Query.has [ attribute (Attr.type_ "file"), attribute (Attr.name "files[]"), id "file" ]
                        ]
        , fuzz props "Should have back and next button" <|
            view
                >> Query.fromHtml
                >> Query.find [ class "interaction-control" ]
                >> Query.findAll [ tag "button" ]
                >> Expect.all
                    [ Query.count (Expect.equal 2)
                    , Query.index 0
                        >> Event.simulate Event.click
                        >> Event.expect (Types.ChangeStage -1)
                    , Query.index 1
                        >> Event.simulate Event.click
                        >> Event.expect (Types.ChangeStage 1)
                    ]
        , fuzz props "Buttons can be disabled" <|
            \p ->
                view p
                    |> Query.fromHtml
                    |> Query.find [ class "interaction-control" ]
                    |> Query.children [ tag "button" ]
                    |> Expect.all
                        [ Query.count (Expect.equal 2)
                        , Query.index 0
                            >> (if p.canGoBack then
                                    Query.hasNot

                                else
                                    Query.has
                               )
                                [ class "disabled" ]
                        , Query.index 1
                            >> (if p.canGoNext then
                                    Query.hasNot

                                else
                                    Query.has
                               )
                                [ class "disabled" ]
                        ]
        ]

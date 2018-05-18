module InteractionPanelSpec exposing (tests)

import Random.Pcg as Random
import Html.Attributes as Attr

import Test exposing (describe, Test, fuzz)
import Test.Html.Query as Query
import Test.Html.Selector exposing (id, tag, class, attribute, disabled)
import Test.Html.Event as Event
import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer)
import Shrink

import Util exposing (queryInOrder)
import State
import InteractionPanel exposing (view, Props)
import Types


props : Fuzzer Props
props =
  let
    generator = Random.map3
        Props
        (Random.int -0 10)
        Random.bool
        Random.bool
    shrinker = \
      { stage
      , canGoBack
      , canGoNext
      } ->
      Shrink.map Props (Shrink.int stage)
       |> Shrink.andMap (Shrink.bool canGoBack)
       |> Shrink.andMap (Shrink.bool canGoNext)
  in
    Fuzz.custom generator shrinker

tests : Test
tests =
  describe "InteractionPanel"
    [ fuzz props "classes" <|
        view
        >> Query.fromHtml
        >> Expect.all
          [ Query.has [class "interaction-panel"]
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
        >> \_ -> Expect.pass
    , fuzz props "Stage 0 should have no interaction" <|
        \p -> view { p | stage = 0 }
          |> Query.fromHtml
          |> Query.find [ class "interaction-interface" ]
          |> Query.children []
          |> Query.count (Expect.equal 0)
    , fuzz props "Stage 1 should have file loader interaction" <|
        \p -> view { p | stage = 1 }
          |> Query.fromHtml
          |> Query.find [ class "interaction-interface" ]
          |> Query.find [ tag "form" ]
          |> Expect.all
            [ Query.has [ class "image-pick" ]
            , Query.find [ tag "input" ]
              >> Query.has [ attribute (Attr.type_ "file"), attribute (Attr.name "files[]"),   id "file" ]
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
          , (Query.index 1
            >> Event.simulate Event.click
            >> Event.expect (Types.ChangeStage 1))
          ]
    , fuzz props "Buttons can be disabled" <|
        \p -> view p
        |> Query.fromHtml
        |> Query.find [ class "interaction-control" ]
        |> Query.children [ tag "button" ]
        |> Expect.all
          [ Query.count (Expect.equal 2)
          , Query.index 0
            >> Query.has [ disabled (not p.canGoBack) ]
          , Query.index 1
            >> Query.has [ disabled (not p.canGoNext) ]
          ]

    ]

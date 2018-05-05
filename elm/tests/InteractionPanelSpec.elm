module InteractionPanelSpec exposing (..)

import Random.Pcg as Random

import Test exposing (describe, test, fuzz)
import Test.Html.Query as Query
import Test.Html.Selector exposing (text, tag, class, classes)
import Test.Html.Event as Event
import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer)
import Shrink

import Util exposing (queryInOrder)
import State
import InteractionPanel exposing (view, Props)
import Types

type Msg = Click Int

props : Fuzzer (Props Msg)
props =
  Fuzz.custom
    (Random.map (\i -> { stage = i, change = (\i -> Click i) }) (Random.int -0 10) )
    (\{ stage, change } -> Shrink.map Props (Shrink.int stage) |> Shrink.andMap (Shrink.noShrink change))

tests =
  describe "InteractionPanel"
    [ fuzz props "classes" <|
        view
        >> Query.fromHtml
        >> Expect.all
          [ Query.has [class "interaction-panel"]
          , Query.children []
            >> queryInOrder
              [ Query.has [class "interaction-instructions"]
              , Query.has [class "interaction-interface"]
              , Query.has [class "interaction-control"]
              ]
          ]
    , fuzz props "Should have header" <|
        view
        >> Query.fromHtml
        >> Query.find [ tag "h1" ]
        >> \_ -> Expect.pass
    , test "Should have back and forwards button" <|
        \() -> { stage = 2, change = (\i -> Click i) }
        |> view
        |> Query.fromHtml
        |> Query.findAll [ tag "button" ]
        |> Expect.all
          [ Query.count (Expect.equal 2)
          , Query.index 0
            >> Event.simulate Event.click
            >> Event.expect (Click -1)
          , (Query.index 1
            >> Event.simulate Event.click
            >> Event.expect (Click 1))
          ]
    ]

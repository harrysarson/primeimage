module DisplayPanelSpec exposing (..)

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
import DisplayPanel exposing (view, Props)
import Types

type Msg = Click Int

props : Fuzzer Props
props =
  Fuzz.custom
    (Random.map (\i -> { stage = i}) (Random.int -0 10) )
    (\{ stage } -> Shrink.map (\i -> { stage = i}) (Shrink.int stage))

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
            >> \_ -> Expect.pass
          , Query.find [ tag "canvas" ]
            >> \_ -> Expect.pass
          ]
    ]

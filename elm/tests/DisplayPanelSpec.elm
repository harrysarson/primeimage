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
import Resources

props : Fuzzer Props
props =
  let
    generator =
      Random.map3
        Props
        (Random.int 0 10)
        Random.bool
        (Random.constant (Just Resources.defaultImage))
    shrinker = \
      { stage
      , canGoNext
      , imagePreview
      } ->
        Shrink.map Props (Shrink.int stage)
         |> Shrink.andMap (Shrink.bool canGoNext)
         |> Shrink.andMap (Shrink.noShrink imagePreview)
  in
    Fuzz.custom
      generator
      shrinker

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

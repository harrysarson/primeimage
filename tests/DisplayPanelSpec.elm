module DisplayPanelSpec exposing (tests)

import Random.Pcg as Random

import Test exposing (describe, Test, fuzz)
import Test.Html.Query as Query
import Test.Html.Selector exposing (tag, class)
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
    nonPrimeImage =
      { number = "112412412412412412512368346936"
      , width = 3
      }
    displayImage =
        { filename = "Test image"
        , contents = "A data url"
        }
    generator =
      Random.map4
        Props
        (Random.int 0 10)
        Random.bool
        (Random.constant (Just displayImage))
        (Random.constant (Just nonPrimeImage))
    shrinker = \
      { stage
      , canGoNext
      , imagePreview
      , nonPrimeImage
      } ->
        Shrink.map Props (Shrink.int stage)
         |> Shrink.andMap (Shrink.bool canGoNext)
         |> Shrink.andMap (Shrink.noShrink imagePreview)
         |> Shrink.andMap (Shrink.noShrink nonPrimeImage)
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
            >> \_ -> Expect.pass
          , Query.find [ tag "canvas" ]
            >> \_ -> Expect.pass
          , Query.find [ class "image-number" ]
            >> Query.find [ tag "text" ]
            >> \_ -> Expect.pass
          ]
    ]

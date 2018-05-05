module InteractionPanelSpec exposing (..)

import Random.Pcg as Random

import Test exposing (describe, test, fuzz)
import Test.Html.Query as Query
import Test.Html.Selector exposing (text, tag)
import Test.Html.Event as Event
import Expect
import Fuzz exposing (Fuzzer)
import Shrink

import State
import InteractionPanel exposing (view, Props)
import Types

type Msg = Click

props : Fuzzer (Props Msg)
props =
  Fuzz.custom
    (Random.map (\i -> { stage = i, change = (\i -> Click) }) (Random.int -0 10) )
    (\{ stage, change } -> Shrink.int stage)

tests =
  describe "InteractionPanel"
    [ Test.fuzz props "Should have header" <|
      \props -> view props
        |> Query.fromHtml
        |> Query.find [ tag "h1" ]
    , test "Should have back button" <|
      \() -> view { stage = 2, change = (\i -> Click) }
        |> Query.fromHtml
        |> Query.findAll [ tag "button" ]
        |> Query.find [ text "Back" ]
        |> Event.simulate Event.click
        |> Event.expect Click
    ]

{--
view : Types.Model -> Html Types.Msg
view props =
  node "main" []
    [ Html.node "link" [ Html.Attributes.rel "stylesheet", Html.Attributes.href "main.css" ] []
    , InteractionPanel.view { stage = props.stage, change = (\change -> Types.ChangeStage change) }
    , DisplayPanel.view { stage = props.stage }
    ]
--}
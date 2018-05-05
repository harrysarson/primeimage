module ViewSpec exposing (..)

import Test exposing (describe, test)
import Test.Html.Query as Query
import Test.Html.Selector exposing (text, tag)
import Expect
import Fuzz exposing (..)

import State
import View exposing (view)
import Types
(initialModel, cmd) = State.initialState

model = State.update State.initialState (Types.ChangeStage 4)

testView = view model

tests =
  describe "View"
    [ fuzz Types.Model "" <| \() ->
      view model
       |> Query.fromHtml
       |> Query.find [ tag "button" ]
       |> Query.has [ text "I'm a button!" ]
    , test "cmd is none" <| \() ->
       cmd |> Expect.equal Cmd.none
    ]

{--
view : Types.Model -> Html Types.Msg
view model =
  node "main" []
    [ Html.node "link" [ Html.Attributes.rel "stylesheet", Html.Attributes.href "main.css" ] []
    , InteractionPanel.view { stage = model.stage, change = (\change -> Types.ChangeStage change) }
    , DisplayPanel.view { stage = model.stage }
    ]
--}
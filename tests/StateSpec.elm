module StateSpec exposing (tests)

import Test exposing (describe, test, Test)
import Expect
import State exposing (..)
import Types

(model, cmd) = initialState

tests : Test
tests =
  describe "State"
    [ describe "Initial State"
      [ test "stage is 0" <| \() ->
         model.stage |> Expect.equal 0
      , test "cmd is none" <| \() ->
         cmd |> Expect.equal Cmd.none
      ]
    , describe "Update State"
      [ test "ChangeState" <| \() ->
          update (Types.ChangeStage 3) model |> Tuple.first |> .stage |> Expect.equal (model.stage + 3)
      ]
    , describe "Subscriptions"
      [ test "No subscriptions" <| \() ->
          subscriptions model |> Expect.equal Sub.none
      ]
    ]

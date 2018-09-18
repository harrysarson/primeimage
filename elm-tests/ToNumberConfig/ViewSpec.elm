module ToNumberConfig.ViewSpec exposing ( tests )

import Array exposing (Array)
import Random.Pcg as Random
import Html.Attributes as Attr

import Test exposing (describe, Test, fuzz, fuzz2)
import Test.Html.Selector exposing (tag, class, attribute, text)
import Test.Html.Query as Query
import Test.Html.Event as Event
import Expect exposing (Expectation)
import Fuzz
import Shrink

import Fuzzers.ToNumberConfig exposing (model)
import Util exposing (stringGen)
import ToNumberConfig.View exposing (view)
import ToNumberConfig.Types as Types

-- TODO: Add checks for error message
tests : Test
tests =
    describe "ToNumberConfig.View"
        [ fuzz
              model
              "there are correct number of inputs"
              <| \model -> view model
                 |> Query.fromHtml
                 |> Query.children [ tag "input" ]
                 |> Query.count (Expect.equal <| 2 + (Array.length model.levels))
        , fuzz
              model
              "each input is contained within a labe"
              <| \model -> view model
                  |> Query.fromHtml
                  |> Query.children [ tag "label" ]
                  |> Query.each
                      (Query.children []
                        >> Expect.all
                            [ Query.count (Expect.equal 2)
                            , Query.index 1
                                >> Query.has [ tag "input" ]
                            ]
                      )
        , fuzz
              model
              "each input follows a label with appropriate text"
              <| \model -> view model
                  |> Query.fromHtml
                  |> Query.children [ tag "label" ]
                  |> Query.keep (text "")
                  |> Expect.all
                      ([ Query.index 0
                          >> Query.has [ text "width" ]
                      , Query.index 1
                          >> Query.has [ text "height" ]
                      ] ++ (Array.toList
                          (model.levels
                            |> Array.indexedMap
                                (\i _ ->
                                    Query.index (2 + i)
                                      >> Query.has [ text "level", text <| String.fromInt (i + 1) ]
                                )
                          )
                      ))
        ,   fuzz
                model
                "there are the correct input attributes"
                <| \model -> view model
                    |> Query.fromHtml
                    |> Expect.all
                        ([ Query.children [ tag "input" ]
                              >> Query.each
                                  (Query.has
                                      [ attribute (Attr.type_ "text")
                                      , class "to-number-config-input"
                                      ]
                                  )
                        , Query.find [ tag "input", attribute <| Attr.attribute "data-input-name" "width" ]
                            >> always Expect.pass
                        , Query.find [ tag "input", attribute <| Attr.attribute "data-input-name" "height" ]
                            >> always Expect.pass
                        ] ++ (Array.toList
                              (model.levels
                                |> Array.indexedMap
                                    (\i _ ->
                                        Query.find
                                            [ tag "input"
                                            , attribute <| Attr.attribute "data-input-name" ("level" ++ String.fromInt (i + 1))
                                            ]
                                        >> always Expect.pass
                                    )
                              )
                        ))
        ,   fuzz2
                model
                (Fuzz.custom (stringGen 0 10) Shrink.string)
                "there are the correct event listeners"
                <| \model str -> view model
                    |> Query.fromHtml
                    |> Query.children [ tag "input" ]
                    |> Expect.all
                        ([ Query.index 0
                            >> Event.simulate (Event.input str)
                            >> Event.expect (Types.SetWidth str)
                        , Query.index 1
                            >> Event.simulate (Event.input str)
                           >> Event.expect (Types.SetHeight str)

                        ] ++ (Array.toList
                              (model.levels
                                |> Array.indexedMap
                                    (\i _ ->
                                        Query.index (i + 2)
                                          >> Event.simulate (Event.input str)
                                          >> Event.expect (Types.SetLevel i str)
                                    )
                              )
                        ))
        ]




{-
view : Types.Model -> Html Types.Msg
view model =
  let
    levelInputs =
        List.indexedMap
          (\level -> inputBox { msg = Types.SetLevel 0, name = "level " ++ String.fromInt (level + 1) })
          (Array.toList model.levels)
    children =
        inputBox { msg = Types.SetWidth, name = "width" } model.width
    ++  inputBox { msg = Types.SetHeight, name = "height" } model.height
    ++  (List.concat levelInputs)

  in
    form
        [ class "to-number-config" ]
        children



inputBox : { msg : (String -> msg), name : String } -> (Types.Errorable Int) -> List (Html msg)
inputBox { msg, name } errorable =
  let
    isError =
        case errorable.error of
            Just _ -> True
            Nothing -> False

    errorMessage =
        errorable.error
            |> Maybe.map (\desc -> div [] [ text desc ])
            |> Maybe.map List.singleton
  in
    (Maybe.withDefault [] errorMessage) ++
    [ label
          [ classList
            [ ( "error-in-field", isError )
            ]
          ]
          [ text name
          , input
              [ type_ "text"
              , class "to-number-config-input"
              , attribute "data-input-name" name
              , on
                  "input"
                  (Decode.map msg (Decode.at ["target", "value"] Decode.string))
              ]
              []
          ]
    ]
-}
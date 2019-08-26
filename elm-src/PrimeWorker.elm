module PrimeWorker exposing
    ( PrimeRequestData(..)
    , encodePrimeRequestData
    , primeResponseDataDecoder
    )

import Duration
import Json.Decode
import Json.Encode
import NumberString
import Types


type PrimeRequestData
    = Start String
    | Stop
    | Pause
    | Resume


encodePrimeRequestData : PrimeRequestData -> Json.Encode.Value
encodePrimeRequestData data =
    case data of
        Start nonPrimeNumber ->
            Json.Encode.object
                [ ( "type", Json.Encode.string "Start" )
                , ( "nonPrimeNumber", Json.Encode.string nonPrimeNumber )
                ]

        Stop ->
            Json.Encode.object
                [ ( "type", Json.Encode.string "Stop" ) ]

        Pause ->
            Json.Encode.object
                [ ( "type", Json.Encode.string "Pause" ) ]

        Resume ->
            Json.Encode.object
                [ ( "type", Json.Encode.string "Resume" ) ]


primeResponseDataDecoder : Json.Decode.Decoder Types.PrimeResult
primeResponseDataDecoder =
    Json.Decode.field "type" Json.Decode.string
        |> Json.Decode.andThen
            (\type_ ->
                case type_ of
                    "InProgress" ->
                        Json.Decode.field
                            "progress"
                            (Json.Decode.list
                                (Json.Decode.maybe
                                    (Json.Decode.map3
                                        (\c t a ->
                                            { combinationsChecked = c
                                            , totalCombinations = t
                                            , averageCheckTime = a
                                            }
                                        )
                                        (Json.Decode.field "combinationsChecked" Json.Decode.int)
                                        (Json.Decode.field "totalCombinations" Json.Decode.int)
                                        (Json.Decode.field "averageCheckTime" Json.Decode.float
                                            |> Json.Decode.map Duration.seconds
                                        )
                                    )
                                )
                            )
                            |> Json.Decode.map Types.InProgress

                    "FoundPrime" ->
                        Json.Decode.map2
                            (\p n ->
                                Types.FoundPrime
                                    { log2ProbPrime = p
                                    , primeNumber = n
                                    }
                            )
                            (Json.Decode.field "log2ProbPrime" Json.Decode.float)
                            (Json.Decode.field "primeNumber" Json.Decode.string
                                |> Json.Decode.map NumberString.NumberString
                            )

                    "Error" ->
                        Json.Decode.field "message" Json.Decode.string
                            |> Json.Decode.map Types.PrimeError

                    other ->
                        Json.Decode.fail
                            ("Invalid prime response data type: " ++ other)
            )

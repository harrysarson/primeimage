module PrimeWorker exposing (PrimeRequestData(..), PrimeresponseData(..), encodePrimeRequestData, primeResponseDataDecoder)

import Duration exposing (Duration)
import Json.Decode
import Json.Encode
import NumberString


type PrimeRequestData
    = Start String
    | Stop
    | Pause
    | Resume


type PrimeresponseData
    = InProgress
        (List
            { combinationsChecked : Int
            , averageCheckTime : Duration
            }
        )
    | FoundPrime
        { log2ProbPrime : Float
        , primeNumber : NumberString.T
        }
    | Error String


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


primeResponseDataDecoder : Json.Decode.Decoder PrimeresponseData
primeResponseDataDecoder =
    Json.Decode.field "type" Json.Decode.string
        |> Json.Decode.andThen
            (\type_ ->
                case type_ of
                    "InProgress" ->
                        Json.Decode.list
                            (Json.Decode.map2
                                (\c a ->
                                    { combinationsChecked = c
                                    , averageCheckTime = a
                                    }
                                )
                                (Json.Decode.field "combinationsChecked" Json.Decode.int)
                                (Json.Decode.field "averageCheckTime" Json.Decode.float
                                    |> Json.Decode.map Duration.seconds
                                )
                            )
                            |> Json.Decode.map InProgress

                    "FoundPrime" ->
                        Json.Decode.map2
                            (\p n ->
                                FoundPrime
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
                            |> Json.Decode.map Error

                    other ->
                        Json.Decode.fail
                            ("Invalid prime response data type: " ++ other)
            )

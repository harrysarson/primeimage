module Types exposing
    ( ExampleOption(..)
    , Image
    , ImageNumber
    , LoadedResource(..)
    , Model
    , Msg(..)
    , PrimeResult(..)
    )

import Duration exposing (Duration)
import File exposing (File)
import Json.Decode
import NumberString
import ToNumberConfig.Types


type LoadedResource a
    = NotLoading
    | Loading
    | Loaded a


type alias Image =
    { contents : String
    , filename : String
    }


type alias ImageNumber =
    { number : NumberString.T
    , width : Int
    }


type alias Model =
    { stage : Int
    , image : Maybe Image
    , toNumberConfig : Maybe ToNumberConfig.Types.Model
    , nonPrime : Maybe NumberString.T
    , prime : Maybe PrimeResult
    , showingInfo : Bool
    }


type PrimeResult
    = InProgress
        (List
            (Maybe
                { combinationsChecked : Int
                , totalCombinations : Int
                , averageCheckTime : Duration
                }
            )
        )
    | FoundPrime
        { log2ProbPrime : Float
        , primeNumber : NumberString.T
        }
    | PrimeError String


type ExampleOption
    = Archer
    | Sunflower
    | Corpus


type Msg
    = Noop
    | ChangeStage Int
    | ImageSelected File
    | ImageRead Image
    | UpdateNumberConfig ToNumberConfig.Types.Msg
    | NonPrimeGenerated NumberString.T ToNumberConfig.Types.Model
    | NonPrimeError String
    | RequestPrime
    | PrimeResponse Json.Decode.Value
    | SelectExampleImage ExampleOption
    | ToggleInfo
    | CloseInfo

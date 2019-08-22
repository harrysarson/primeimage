module Types exposing
    ( Image
    , ImageNumber
    , LoadedResource(..)
    , Model
    , Msg(..)
    , PrimeResult(..)
    )

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
    , toNumberConfig : ToNumberConfig.Types.Model
    , nonPrime : Maybe NumberString.T
    , prime : PrimeResult
    }


type PrimeResult
    = DefinatelyPrime NumberString.T
    | ProbablyPrime NumberString.T
    | NothingYet
    | FetchingPrime
    | PrimeError String


type Msg
    = Noop
    | ChangeStage Int
    | ImageSelected File
    | ImageRead Image
    | UpdateNumberConfig ToNumberConfig.Types.Msg
    | NonPrimeGenerated NumberString.T
    | NonPrimeError String
    | RequestPrime
    | PrimeGenerated PrimeResult
    | Primeresponse Json.Decode.Value

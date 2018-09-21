module Types exposing
    ( Image
    , ImageNumber
    , Model
    , Msg(..)
    , PrimeResult(..)
    )

import NumberString
import ToNumberConfig.Types


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
    , primeEndPoint : String
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
    = ChangeStage Int
    | SetPrimeEndPoint String
    | ImageSelected
    | ImageRead Image
    | UpdateNumberConfig ToNumberConfig.Types.Msg
    | NonPrimeGenerated NumberString.T
    | NonPrimeError String
    | RequestPrime
    | PrimeGenerated PrimeResult

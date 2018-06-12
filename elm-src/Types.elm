module Types exposing ( Image
                      , ImageNumber
                      , Model
                      , Msg(..)
                      )

import ToNumberConfig.Types

type alias Image =
  { contents : String
  , filename : String
  }

type alias ImageNumber =
  { number : String
  , width : Int
  }

type alias Model =
  { stage : Int
  , image : Maybe Image
  , toNumberConfig : ToNumberConfig.Types.Model
  , nonPrime : Maybe ImageNumber
  }


type Msg
  = ChangeStage Int
  | ImageSelected
  | ImageRead Image
  | UpdateNumberConfig ToNumberConfig.Types.Msg
  | NonPrimeGenerated ImageNumber
  | NonPrimeError String

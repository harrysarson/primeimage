module Config exposing
    ( copyableStages
    , imageInputId
    , imageInputStage
    , maxStage
    , nonPrimeImageNumberId
    , nonPrimeStage
    )

import Set exposing (Set)


maxStage : Int
maxStage =
    3


imageInputStage : Int
imageInputStage =
    1


nonPrimeStage : Int
nonPrimeStage =
    2


imageInputId : String
imageInputId =
    "file"


copyableStages : Set Int
copyableStages =
    Set.fromList [ 0, 2, 3 ]


nonPrimeImageNumberId : String
nonPrimeImageNumberId =
    "nonPrimeImageNumberId"

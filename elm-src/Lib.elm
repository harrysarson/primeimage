module Lib exposing (saturateStageChange)

import Config


saturateStageChange : { a | stage : Int, image : Maybe b } -> Int -> Int
saturateStageChange model change =
    let
        maxStage =
            if model.image == Nothing then
                Config.imageInputStage

            else
                Config.maxStage
    in
    if change > 0 then
        min (maxStage - model.stage) change

    else
        max -model.stage change

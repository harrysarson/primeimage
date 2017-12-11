import { types as actionType } from '../actions/index.js';

const { Redux } = window;

const currentStage = (state = 0, action) => {
  switch (action.type) {
    case actionType.moveStage:
      return Math.max(0, state + action.change);
    case actionType.setStage:
      return action.new_stage;
    default:
      return state;
  }
};

const rootReducer = Redux.combineReducers({
  currentStage,
});

export default rootReducer;

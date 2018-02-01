import { combineReducers } from 'redux/es/index.js';
import { types as actionType } from '../actions/index.js';


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

function image(
  state = {
    isLoading: false,
    invalid: false,
    error: null,
    img: null,
  },
  action,
) {
  switch (action.type) {
    case actionType.loadFile:
      switch (action.status) {
        case 'begin':
          return Object.assign(state, {
            isFetching: true,
            invalid: false,
            error: null,
          });
        case 'end':
          return Object.assign(state, {
            isFetching: false,
            invalid: false,
            error: null,
            img: action.img,
          });
        case 'error':
          return Object.assign(state, {
            invalid: true,
            error: action.error,
          });
        default:
          return Object.assign(state, {
            invalid: true,
            error: new Error(`${action.status} is an invalid action status`),
          });
      }
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  currentStage,
  image,
});

export default rootReducer;

const { combineReducers } = Redux;
const { Map: IMap } = Immutable;
import { types as action_type } from '../actions/index.js';

const initialState = IMap({
  current_stage: 0,
  x: 9,
});

const app = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case action_type.move_stage:
      return state.update('current_stage', stage => Math.max(0, stage + action.change));
    case action_type.set_stage:
      return state.set('current_stage', action.new_stage);
    default:
      return state;
  };
}

export default app;

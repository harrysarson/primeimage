import { types as actionType } from '../actions/index.js';

const { Immutable } = window;

const initialState = Immutable.Map({
  current_stage: 0,
  x: 9,
});

const app = (state = initialState, action) => {
  switch (action.type) {
    case actionType.move_stage:
      return state.update('current_stage', stage => Math.max(0, stage + action.change));
    case actionType.set_stage:
      return state.set('current_stage', action.new_stage);
    default:
      return state;
  }
};

export default app;

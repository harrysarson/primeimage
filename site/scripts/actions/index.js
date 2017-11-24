const { Immutable } = window;

export const types = Immutable.Set([
  'moveStage',
  'setStage',
])
  .toMap()
  .toObject();

export const creators = Immutable.Map({
  moveStage: change => ({ change }),
  setStage: newStage => ({ newStage }),
})
  .map((creator, action) => (...args) => Object.assign(
    creator(...args),
    { type: types[action] },
  ))
  .toObject();

Object.freeze(types);
Object.freeze(creators);

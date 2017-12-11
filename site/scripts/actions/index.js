
export const types = Immutable.Set([
  'moveStage',
  'setStage',
])
  .toMap()
  .toObject();

export const creators = Immutable.Map({
  moveStage: change => ({
    type: types.moveStage,
    change,
  }),
  setStage: newStage => ({
    type: types.setStage,
    newStage,
  }),
})
  .toObject();

Object.freeze(types);
Object.freeze(creators);

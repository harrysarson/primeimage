
export const types = [
  'moveStage',
  'setStage',
].reduce((obj, type) => Object.assign(obj, { [type]: type }), {});

export const creators = {
  moveStage: change => ({
    type: types.moveStage,
    change,
  }),
  setStage: newStage => ({
    type: types.setStage,
    newStage,
  }),
};

Object.freeze(types);
Object.freeze(creators);

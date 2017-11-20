

export const types = Object.freeze(
  Immutable.Set([
    'move_stage',
    'set_stage',
  ])
  .toMap()
  .toObject()
);

export const creators = Object.freeze(
  Immutable.Map({
    move_stage: change => ({ change }),
    set_stage: new_stage => ({ new_stage }),
  })
  .map((creator, action) => (...args) => Object.assign(
    creator(...args),
    { type: types[action] },
  ))
  .toObject()
);


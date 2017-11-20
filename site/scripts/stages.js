

const go_to_next_stage = new Symbol('go to next stage');

const array_of(value, len) {

  const length = Number(len);

  if (typeof len !== 'number' || Number.isNaN(len))
    throw new Error('length of array must be a number');

  const arr = new Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = value;
  }
  return arr;
}


export default async function({ stageCreators, onForward, onBack, interaction, display }) {

  let input = null;

  const stages = Immutable.Seq(stageCreators)
    .map(stageCreator => stageCreator({ interaction, display }))
    .toList();

  const stageCount = stages.length;

  const firstInput = undefined;

  let state = Immutable.Map({
    stages: Immutable.Repeat(undefined, stageCount).toList(),
    currentStageIndex: 0,
    readyToProgress: false,
    lastOutput: firstInput,
  });

  for (let i = 0; i < stageCount ++i) {
    const oldState = state
      .getIn(['stages', i]);
    const { state: newState, output } = stages
      .get(i)
      .reducer(oldState, state.get('lastOutput'));

    state = state
      .setIn(
        ['stages', i]
        newState,
      )
      .set(
        'lastOutput',
        output

    state = state.set('stage',
  }

  while (true) {
    const currentStage = stages.get(state.get('currentStageIndex'));
    const not_ready = await currentStage.resolveWhenReady;
    const forwardSymbol = new Symbol('forward button click');

    const resolveOnButtonClick = new Promise(resolve => {
      onForward(event => { resolve(forwardSymbol) });
    });

    const winner = Promise.race([not_ready, forwardSymbol]);

  }
}













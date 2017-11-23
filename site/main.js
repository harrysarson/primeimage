import imageLoad from './scripts/image-load.js';
import createStore from './scripts/store/create.js';

import createButtons from './scripts/gui/buttons.js';
import { creators as actionCreators } from './scripts/actions/index.js';

const store = createStore();

const displays = document.querySelectorAll('.display-panel');

const interaction = document.getElementById('interaction');

const configuration = {
  stage_count: 2,
};

const wrap = (...args) => ({
  map: func => func(...args),
});

createButtons({
  $root: document,
  attributename: 'stage-change',
  max_stage: configuration.stage_count - 1,
  Ocan_move: wrap(store
    .map(state => state.get('current_stage'))
    .distinctUntilChanged())
    .map(Ostage => ({
      back: Ostage.map(stage => (stage <= 0)),
      forward: Ostage.map(stage => (stage <= 0)),
    })),
  move_stage(change) { store.dispatch(actionCreators.move_stage(change)); },
});

imageLoad({
  input: interaction.querySelector('.interaction-interface').children[1],
  output: displays[0].children[1],
});

store.subscribe(function onNext(state) {
  for (const oldSelectedElement of document.getElementsByClassName('current-stage')) {
    oldSelectedElement.classList.remove('current-stage');
  }

  const newStage = state.get('current_stage');

  for (const container of document.getElementsByClassName('stage-selecting')) {
    container
      .style
      .setProperty('--show-stage', newStage);

    const newSelectedElement = container.children[newStage];
    if (newSelectedElement != null) {
      newSelectedElement.classList.add('current-stage');
    }
  }
});

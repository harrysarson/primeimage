import imageLoad from './scripts/image-load.js';
import createStore from './scripts/store/create.js';
import Chain from './scripts/lib/Chain.js';

import createButtons from './scripts/gui/buttons.js';

const { Rx } = window;
const { operators } = Rx;

const store = createStore();

const displays = document.querySelectorAll('.display-panel');

const interaction = document.getElementById('interaction');

const configuration = {
  stage_count: 2,
};

new Chain(createButtons({
  $root: document,
  attributename: 'data-stage-change',
  maxStage: configuration.stage_count - 1,
}))
  .do((buttons) => {
    buttons.observable(document).subscribe(action => store.dispatch(action));
    store.pipe(
      operators.map(state => state.get('current_stage')),
      buttons.updater(document),
    )
      .subscribe();
  });

imageLoad({
  input: interaction.querySelector('.interaction-interface').children[1],
  output: displays[0].children[1],
});

store.subscribe(function onNext(state) {
  for (const oldSelectedElement of document.querySelectorAll('.current-stage')) {
    oldSelectedElement.classList.remove('current-stage');
  }

  const newStage = state.get('current_stage');

  for (const container of document.querySelectorAll('.stage-selecting')) {
    container
      .style
      .setProperty('--show-stage', newStage);

    const newSelectedElement = container.children[newStage];
    if (newSelectedElement != null) {
      newSelectedElement.classList.add('current-stage');
    }
  }
});

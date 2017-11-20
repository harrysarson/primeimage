import imageLoad from './scripts/image-load.js';
import createStore from './scripts/store/create.js';

import { creators as action_creators } from './scripts/actions/index.js';

const pages = [
  imageLoad
];

const store = createStore();

const displays = document.querySelectorAll('.display-panel');
const changeStageButtons = document.querySelectorAll('[data-stage-change]');

const interaction = document.getElementById('interaction');

const configuration = {
  stage_count: 2,
};

imageLoad({
  input: interaction.querySelector('.interaction-interface').children[1],
  output: displays[0].children[1],
});


function buttonGoesBack(button) {
  return {}.hasOwnProperty.call(button.dataset, 'stageChange') && button.dataset.stageChange < 0;
}

// todo replace with rx
let oldStage = 0;

store.subscribe(function() {

  for (const oldSelectedElement of document.getElementsByClassName('current-stage')) {
    oldSelectedElement.classList.remove('current-stage');
  }

  const newStage = store.getState().get('current_stage');

  for (const container of document.getElementsByClassName('stage-selecting')) {
      container
        .style
        .setProperty('--show-stage', newStage);

      const newSelectedElement = container.children[newStage];
      if (newSelectedElement != null) {
        newSelectedElement.classList.add('current-stage');
      }
  }

  if (newStage === 0 && oldStage !== 0) {
    for (const button of changeStageButtons) {
      if (button.dataset.stageChange < 0) {
        button.setAttribute('disabled', '');
      }
    }
  } else if (newStage !== 0 && oldStage === 0) {
    for (const button of changeStageButtons) {
      if (button.dataset.stageChange < 0) {
        button.removeAttribute('disabled', '');
      }
    }
  }

  if (newStage === configuration.stage_count-1 && oldStage !== configuration.stage_count-1) {
    for (const button of changeStageButtons) {
      if (button.dataset.stageChange > 0) {
        button.setAttribute('disabled', '');
      }
    }
  } else if (newStage !== configuration.stage_count-1 && oldStage === configuration.stage_count-1) {
    for (const button of changeStageButtons) {
      if (button.dataset.stageChange > 0) {
        button.removeAttribute('disabled', '');
      }
    }
  }


  oldStage = newStage;

});


for (const button of changeStageButtons) {
  button.addEventListener('click', (e) => {

    const stageChange = +button.dataset.stageChange;

    if (Number.isNaN(stageChange) || stageChange % 1 !== 0) {
      throw new Error(`Element ${button}'s "data-stage-change" property must be an integer`)
    }

    store.dispatch(action_creators.move_stage(stageChange));
  });
}

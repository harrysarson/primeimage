import imageLoad from './scripts/image-load.js';


const pages = [
  imageLoad
];



const displays = [...document.querySelectorAll('.display-panel')];
const changeStageButtons = [...document.getElementsByClassName('change-stage')];

const interaction = document.getElementById('interaction');

imageLoad({
  input: interaction.querySelector('.interaction-interface').children[1],
  output: displays[0].children[1],
});

for(const display of displays) {
  for (let i = 0;  i < 10; ++i) {
    const div = document.createElement('div');
    div.textContent = i;
    display.appendChild(div);
  }
}


let state = updateStage({
  currentStage: 0,
  selectedElements: new Set(),
}, 0);

function buttonGoesBack(button) {
  return {}.hasOwnProperty.call(button.dataset, 'stageChange') && button.dataset.stageChange < 0;
}

function updateStage(state, newStage) {

  const newState = Object.assign({}, state, { currentStage: newStage });

  for (const oldSelectedElement of state.selectedElements) {
    oldSelectedElement.classList.remove('current-stage');
  }

  newState.selectedElements = new Set();

  for (const container of [...document.getElementsByClassName('stage-selecting')]) {
      container
        .style
        .setProperty('--show-stage', newStage);

      const newSelectedElement = container.children[newStage];
      if (newSelectedElement != null) {
        newSelectedElement.classList.add('current-stage');
        newState.selectedElements.add(newSelectedElement);
      }
  }
  if (newStage === 0) {
    for (const button of changeStageButtons) {
      if (buttonGoesBack(button)) {
        button.setAttribute('disabled', '');
      }
    }
  } else {
    for (const button of changeStageButtons) {
      if (buttonGoesBack(button)) {
        button.removeAttribute('disabled', '');
      }
    }
  }

  return newState;
}

function moveStage(amount = 1) {
  const oldStage = state.currentStage;
  const newStage = oldStage + amount;

  if (oldStage === newStage || newStage < 0) return;

  state = updateStage(state, newStage);
}


for (const button of changeStageButtons) {
  button.addEventListener('click', (e) => {

    const stageChange = {}.hasOwnProperty.call(button.dataset, 'stageChange')
      ? +button.dataset.stageChange
      : 1;

    if (Number.isNaN(stageChange) || stageChange % 1 !== 0) {
      throw new Error(`Element ${button}'s "data-stage-change" property must be an integer`)
    }

    moveStage(stageChange);
  });
}


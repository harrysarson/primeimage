/* global _, ClipboardJS */
import {Elm} from '../built/elm.js'; // eslint-disable-line import/no-unresolved
import {getImageData, quantise, guessLevels} from './create-non-prime.js';
import {GreyImageData} from './grey-image-data.js';
import {resizeText} from './resize-text.js';
import {runWhen} from './run-when.js';

const debounce = typeof _ === 'undefined' ?
  (console.error('Could not load lodash, primeimage will not debounce input!'), x => x) :
  _.debounce;

const primeSearchWorker = new Worker('./js/prime-search-worker.js');

const app = Elm.Main.init();

try {
  new ClipboardJS('.copy-me')
    .on('success', event => {
      event.clearSelection();
    });
} catch (error) {
  console.error('Error setting up clipboard.js! Copy button will not work');
  console.error(error);
}

app.ports.logError.subscribe(description => {
  console.error(description);
});

app.ports.requestPrime.subscribe(payload => {
  primeSearchWorker.postMessage(payload);
});

primeSearchWorker.addEventListener('message', ({data}) => {
  app.ports.onPrimeResponse.send(data);
});

app.ports.requestNonPrime.subscribe(debounce(async ({toNumberConfig, image}) => {
  const numberLookup = [8, 6, 5, 7];
  const expectedNumLevels = numberLookup.length - 1;
  let number;
  let width;
  let levels;
  try {
    let color;
    if (toNumberConfig === null) {
      color = await getImageData(image.contents, null);
      width = color.width;
    } else {
      width = toNumberConfig.width.value;
      color = await getImageData(image.contents, width);
    }

    const grey = GreyImageData.fromColorImage(color);
    if (toNumberConfig === null) {
      levels = guessLevels(grey, expectedNumLevels);
    } else {
      const errorableLevels = toNumberConfig.levels;
      levels = errorableLevels.map(x => x.value);
    }

    if (levels.length !== expectedNumLevels) {
      app.ports.nonPrimeError.send(
        `Incorrect number of levels (${levels.length}), expected ${expectedNumLevels}`,
      );
      return;
    }

    const quantised = quantise(grey.data, new Uint8Array(grey.data.length), levels);
    number = quantised.map(x => numberLookup[x]);
  } catch (error) {
    app.ports.nonPrimeError.send(`${error}`);
    throw error;
  }

  app.ports.nonPrimeGenerated.send({
    nonPrime: number.join(''),
    width,
    levels
  });
}), 100);

app.ports.setCssProp.subscribe(([selector, prop, value]) => {
  for (const $el of document.querySelectorAll(selector)) {
    $el.style.setProperty(prop, value);
  }
});

/* Automatic text resizing */

function resizeAllTexts() {
  for (const node of document.querySelectorAll('.auto-resize')) {
    resizeText(node);
  }
}

(async () => {
  try {
    await runWhen(() => document.querySelector('.display-panel') !== null, 5);
  } catch (error) {
    console.log(`Given up trying to automatically resize image number text due to error:\n${error}`);
    return;
  }

  resizeAllTexts();
})();

window.addEventListener('resize', debounce(resizeAllTexts, 200));

app.ports.resizeImageNumber.subscribe(() => {
  requestAnimationFrame(resizeAllTexts);
});

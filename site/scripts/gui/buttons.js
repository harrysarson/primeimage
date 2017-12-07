import { creators as actionCreators } from '../actions/index.js';
import Iterable from '../lib/Iterable.js';

const { Rx } = window;

const { setAttribute, removeAttribute } = Element.prototype;

const attibuteUpdater = $elements =>
  function setDisabledAttribute(shouldDisable) {
    const toggleAttribute = shouldDisable ? setAttribute : removeAttribute;

    for (const $element of $elements) {
      toggleAttribute.call($element, 'disabled', '');
    }
  };


/**
 * Creates GUI for buttons that change the current stage.
 *
 * @param {object} args
 * @param {Element} args.attributename Name of HTML attribute defining the button.
 * @param {number} maxStage Index of maximum stage.
 *
 * @returns Object allowing buttons to be observed and updated.
 */
export default ({ $root, attributename, maxStage }) => {
  const $elements = new Iterable(function* getElements() {
    yield* $root.querySelectorAll('[attributename]');
  });

  const { map, startWith, distinctUntilChanged } = Rx.operators;

  return Object.freeze({
    observable: Rx.Observable.fromEvent($root, 'click')
      .filter(event => event.target.hasAttribute(attributename))
      .map((event) => {
        const stageChange = +event.target.getAttribute(attributename);

        if (Number.isNaN(stageChange) || stageChange % 1 !== 0) {
          throw new Error(`Element ${event.target}'s "attributename" property must be an integer`);
        }

        return stageChange;
      })
      .map(actionCreators.moveStage),

    updater(stageStore) {
      stageStore.pipe(
        map(stage => (stage <= 0)),
        startWith(false),
        distinctUntilChanged(),
      )
        .subscribe(attibuteUpdater($elements.filter(button =>
          button.getAttribute(attributename) < 0)));

      stageStore.pipe(
        map(stage => (stage >= maxStage)),
        startWith(false),
        distinctUntilChanged(),
      )
        .subscribe(attibuteUpdater($elements.filter(button =>
          button.getAttribute(attributename) > 0)));
    },
  });
};

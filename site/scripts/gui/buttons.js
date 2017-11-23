
function dashed2camel(dashedAttributeName) {
  // check that dashedAttributeName is valid

  if (''.match.call(dashedAttributeName, /[^a-z-.:_]/) != null) { throw new Error(`${dashedAttributeName} is not a valid dash-style attribute name`); }

  return ''.replace.call(dashedAttributeName, /-[a-z]/g, chr => chr.substring(1).toUpperCase());
}

function disableButtonsMatchingWhenTrue($elements, OcanMove, predicate) {
  return OcanMove
    .startWith(false)
    .distinctUntilChanged()
    .pairwise()
    .subscribe(function onNext([wasPreviouslyDisabled, isButtonDisabled]) {
      if (isButtonDisabled || wasPreviouslyDisabled) {
        const toggleDisabledAttribute = isButtonDisabled
          ? function setDisabledAttribute(button) { button.setAttribute('disabled', ''); }
          : function removeDisabledAttribute(button) { button.removeAttribute('disabled', ''); };

        [...$elements]
          .filter(predicate)
          .forEach(toggleDisabledAttribute);
      }
    });
}


export default function ({
  $root,
  attributename,
  OcanMove,
  move_stage,
}) {
  const camelCasedAttributeName = dashed2camel(attributename);

  $root.addEventListener('click', function onClick(event) {
    if ({}.hasOwnProperty.call(event.target.dataset, camelCasedAttributeName)) {
      const stageChange = +event.target.dataset[camelCasedAttributeName];

      if (Number.isNaN(stageChange) || stageChange % 1 !== 0) {
        throw new Error(`Element ${event.target}'s "data-${attributename}" property must be an integer`);
      }

      move_stage(stageChange);
    }
  });

  function* getElements() {
    yield* $root.querySelectorAll(`[data-${attributename}]`);
  }

  disableButtonsMatchingWhenTrue(
    getElements,
    OcanMove.back,
    button => button.dataset.stageChange < 0,
  );

  disableButtonsMatchingWhenTrue(
    getElements,
    OcanMove.forward,
    button => button.dataset.stageChange > 0,
  );
}

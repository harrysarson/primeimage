

const Rx = window.Rx;

function dashed2camel(dashed_attribute_name) {

  // check that dashed_attribute_name is valid

  if (''.match.call(dashed_attribute_name, /[^a-z-.:_]/) != null)
    throw new Error(`${dashed_attribute_name} is not a valid dash-style attribute name`);

  return ''.replace.call(dashed_attribute_name, /-[a-z]/g, chr => chr.substring(1).toUpperCase());
}

function disableButtonsMatchingWhenTrue(predicate) {
  return this
    .startWith(false)
    .distinctUntilChanged()
    .pairwise()
    .subscribe(function([last_value, cannot_go_back]) {
      if (cannot_go_back || last_value) {
        const toggleDisabledAttribute = cannot_go_back
          ? function(button) { button.setAttribute('disabled', ''); }
          : function(button) { button.removeAttribute('disabled', ''); };

        [...$root.querySelectorAll(`[data-${attributename}]`)]
          .filter(predicate)
          .forEach(toggleDisabledAttribute);
      }
    });
}




export default function({
  $root,
  attributename,
  stage_observer,
  move_stage,
  max_stage = Infinity,
}) {
  const camelCasedAttributeName = dashed2camel(attributename);

  $root.addEventListener('click', function(event) {
    if ({}.hasOwnProperty.call(event.target.dataset, camelCasedAttributeName)) {
      const stageChange = +event.target.dataset[camelCasedAttributeName];

      if (Number.isNaN(stageChange) || stageChange % 1 !== 0) {
        throw new Error(`Element ${button}'s "data-${attributename}" property must be an integer`)
      }

      move_stage(stageChange);
    }
  });

  disableButtonsMatchingWhenTrue.call(
    stage_observer
      .map(stage => (stage <= 0)),
    button => button.dataset.stageChange < 0,
  );

  disableButtonsMatchingWhenTrue.call(
    stage_observer
      .map(stage => (stage >= maxStage)),
    button => button.dataset.stageChange > 0,
  );


}

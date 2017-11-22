

const Rx = window.Rx;

function dashed2camel(dashed_attribute_name) {

  // check that dashed_attribute_name is valid

  if (''.match.call(dashed_attribute_name, /[^a-z-.:_]/) != null)
    throw new Error(`${dashed_attribute_name} is not a valid dash-style attribute name`);

  return ''.replace.call(dashed_attribute_name, /-[a-z]/g, chr => chr.substring(1).toUpperCase());
}


export default function({
  $root,
  attributename,
  stage_observer,
  move_stage,
  stage_count = Infinity,
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

  stage_observer
    .first()
    .subscribe(function(initialStage) {
      const changeStageButtons = $root.querySelectorAll(`[data-${attributename}]`);

      if (initialStage <= 0) {
        for (const button of changeStageButtons) {
          if (button.dataset.stageChange < 0) {
            button.setAttribute('disabled', '');
          }
        }
      } else if (initialStage >= stage_count-1) {
        for (const button of changeStageButtons) {
          if (button.dataset.stageChange > 0) {
            button.setAttribute('disabled', '');
          }
        }
      }
    })
  ;

  stage_observer
    .pairwise()
    .subscribe(function ([oldStage, newStage]) {

      const changeStageButtons = $root.querySelectorAll(`[data-${attributename}]`);

      if (newStage <= 0 && oldStage > 0) {
        for (const button of changeStageButtons) {
          if (button.dataset.stageChange < 0) {
            button.setAttribute('disabled', '');
          }
        }
      } else if (newStage > 0 && oldStage <= 0) {
        for (const button of changeStageButtons) {
          if (button.dataset.stageChange < 0) {
            button.removeAttribute('disabled', '');
          }
        }
      }

      if (newStage >= stage_count-1 && oldStage < stage_count-1) {
        for (const button of changeStageButtons) {
          if (button.dataset.stageChange > 0) {
            button.setAttribute('disabled', '');
          }
        }
      } else if (newStage < stage_count-1 && oldStage >= stage_count-1) {
        for (const button of changeStageButtons) {
          if (button.dataset.stageChange > 0) {
            button.removeAttribute('disabled', '');
          }
        }
      }
    });

}

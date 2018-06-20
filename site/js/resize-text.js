/*
 * Note: this (probably) fails when $parent has padding.
 */
export function childFits($node, $parent) {
  const parentDim = {
    width: $parent.clientWidth,
    height: $parent.clientHeight
  };
  const textDim = {
    width: $node.offsetWidth,
    height: $node.offsetHeight
  };

  return textDim.width < parentDim.width && textDim.height < parentDim.height;
}

export function resizeText($node) {
  // TODO: check not null
  const $parent = $node.parentNode;

  let intFontSize = parseInt(getComputedStyle($node).getPropertyValue('font-size'), 10);

  if (isNaN(intFontSize)) {
    throw new TypeError('Invalid font size read');
  }

  /* Increase font size util it does not fit */

  for (; intFontSize < 100 && childFits($node, $parent); ++intFontSize) {
    $node.style.setProperty('font-size', intFontSize + 'px');
  }

  /* Decrease font size to fit */

  for (; intFontSize > 0 && !childFits($node, $parent); --intFontSize) {
    $node.style.setProperty('font-size', intFontSize + 'px');
  }
}

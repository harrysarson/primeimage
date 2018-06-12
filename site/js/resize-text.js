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

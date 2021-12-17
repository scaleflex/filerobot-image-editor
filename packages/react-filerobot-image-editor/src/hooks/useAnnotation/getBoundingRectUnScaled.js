const getBoundingRectUnScaled = (
  pointerOffsets = {},
  pointerDown = {},
  previewGroup,
) => {
  const boundingRect = {};
  const parentAttrs = previewGroup.parent.attrs;
  boundingRect.x =
    Math.min(pointerOffsets.offsetX, pointerDown.startedX) -
      parentAttrs.xPadding || 0;
  boundingRect.y =
    Math.min(pointerOffsets.offsetY, pointerDown.startedY) -
      parentAttrs.yPadding || 0;
  boundingRect.width = pointerOffsets.offsetX - pointerDown.startedX;
  boundingRect.height = pointerOffsets.offsetY - pointerDown.startedY;
  boundingRect.startedX = pointerDown.startedX - parentAttrs.xPadding || 0;
  boundingRect.startedY = pointerDown.startedY - parentAttrs.yPadding || 0;

  return boundingRect;
};

export default getBoundingRectUnScaled;

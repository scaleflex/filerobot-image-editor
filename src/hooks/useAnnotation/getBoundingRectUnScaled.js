const getBoundingRectUnScaled = (
  pointerOffsets = {},
  pointerDown = {},
  canvas,
  previewGroup,
) => {
  const scale = canvas.scale();
  const boundingRect = {};
  const parentAttrs = previewGroup.parent.attrs;
  boundingRect.x =
    Math.min(pointerOffsets.offsetX, pointerDown.startedX) / scale.x -
      parentAttrs.xPadding || 0;
  boundingRect.y =
    Math.min(pointerOffsets.offsetY, pointerDown.startedY) / scale.y -
      parentAttrs.yPadding || 0;
  boundingRect.width =
    (pointerOffsets.offsetX - pointerDown.startedX) / scale.x;
  boundingRect.height =
    (pointerOffsets.offsetY - pointerDown.startedY) / scale.y;
  boundingRect.startedX =
    pointerDown.startedX / scale.x - parentAttrs.xPadding || 0;
  boundingRect.startedY =
    pointerDown.startedY / scale.y - parentAttrs.yPadding || 0;

  return boundingRect;
};

export default getBoundingRectUnScaled;

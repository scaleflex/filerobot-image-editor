const getBoundingRectUnScaled = (
  pointerOffsets = {},
  pointerDown = {},
  canvas,
  previewGroup,
  // updatedCurrentAnnotation = {},
) => {
  const scale = canvas.scale();
  const boundingRect = {};
  boundingRect.x =
    Math.min(pointerOffsets.offsetX, pointerDown.startedX) / scale.x -
      previewGroup.parent.attrs.xPadding || 0;
  boundingRect.y =
    Math.min(pointerOffsets.offsetY, pointerDown.startedY) / scale.y -
      previewGroup.parent.attrs.yPadding || 0;
  boundingRect.width =
    Math.abs(pointerOffsets.offsetX - pointerDown.startedX) / scale.x;
  boundingRect.height =
    Math.abs(pointerOffsets.offsetY - pointerDown.startedY) / scale.y;

  // if (calcDimensionsProps && typeof calcDimensionsProps === 'function') {
  //   boundingRect = {
  //     ...boundingRect,
  //     ...calcDimensionsProps({
  //       ...boundingRect,
  //       startX: pointerDown.startedx - canvasDimensions.x,
  //       startY: pointerDown.startedy - canvasDimensions.y,
  //       endX: pointerOffsets.offsetX - canvasDimensions.x,
  //       endY: pointerOffsets.offsetY - canvasDimensions.y,
  //       prevX: updatedCurrentAnnotation.points?.[2] ?? updatedCurrentAnnotation.x,
  //       prevY: updatedCurrentAnnotation.points?.[3] ?? updatedCurrentAnnotation.y,
  //       prevPoints: updatedCurrentAnnotation.points,
  //     }),
  //   };
  // }
  return boundingRect;
};

export default getBoundingRectUnScaled;

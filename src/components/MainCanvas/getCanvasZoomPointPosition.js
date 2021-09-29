export const boundPositionInCanvas = (konvaCanvas, pos, currentScale) => {
  const canvasWidth = konvaCanvas.width();
  const canvasHeight = konvaCanvas.height();
  const x = Math.min(0, Math.max(pos.x, canvasWidth * (1 - currentScale.x)));
  const y = Math.min(0, Math.max(pos.y, canvasHeight * (1 - currentScale.y)));

  return {
    x,
    y,
  };
};

const getCanvasZoomPointPosition = (konvaCanvas, pointerZoomedPoint = {}, newScale = {}) => {
  if (!konvaCanvas) { return undefined; }
  const xOldScale = konvaCanvas.scaleX();
  const yOldScale = konvaCanvas.scaleY();

  const zoomPointOrCanvasCenter = {
    x: pointerZoomedPoint.x ?? (konvaCanvas.width() / 2),
    y: pointerZoomedPoint.y ?? (konvaCanvas.height() / 2),
  };

  const pointsTo = {
    x: (zoomPointOrCanvasCenter.x / xOldScale) - (konvaCanvas.x() / xOldScale),
    y: (zoomPointOrCanvasCenter.y / yOldScale) - (konvaCanvas.y() / yOldScale),
  };
  console.log(zoomPointOrCanvasCenter, pointsTo)

  const x = -(pointsTo.x - (zoomPointOrCanvasCenter.x / newScale.x)) * newScale.x;
  const y = -(pointsTo.y - (zoomPointOrCanvasCenter.y / newScale.y)) * newScale.y;

  // return boundPositionInCanvas(konvaCanvas, { x, y }, newScale);
  return {
    x, y
  }
};

export default getCanvasZoomPointPosition;

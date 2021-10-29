import { DEFAULT_ZOOM_FACTOR } from './constants';

const calculateZoomData = (newZoom, oldZoom, canvasWidth, canvasHeight) => {
  if (newZoom.factor === DEFAULT_ZOOM_FACTOR) {
    return {
      x: 0,
      y: 0,
      factor: DEFAULT_ZOOM_FACTOR,
    };
  }

  const isZoomIn = newZoom.factor > oldZoom.factor;
  const mousePointTo = {
    x: (newZoom.x - oldZoom.x || 0) / oldZoom.factor,
    y: (newZoom.y - oldZoom.y || 0) / oldZoom.factor,
  };

  const newPos = {
    x: newZoom.x - mousePointTo.x * newZoom.factor,
    y: newZoom.y - mousePointTo.y * newZoom.factor,
  };
  if (!isZoomIn || oldZoom.factor !== 1) {
    newPos.x = Math.min(
      0,
      Math.max(newPos.x, canvasWidth * (1 - oldZoom.factor)),
    );
    newPos.y = Math.min(
      0,
      Math.max(newPos.y, canvasHeight * (1 - oldZoom.factor)),
    );
  }

  if (newZoom.factor < 1) {
    const initialAndScaledWidthDiff =
      canvasWidth - canvasWidth * newZoom.factor;
    const initialAndScaledHeightDiff =
      canvasHeight - canvasHeight * newZoom.factor;
    newPos.x += initialAndScaledWidthDiff / 2;
    newPos.y += initialAndScaledHeightDiff / 2;
  }

  return {
    ...newPos,
    factor: newZoom.factor,
  };
};

export default calculateZoomData;

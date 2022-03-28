/** Internal Dependencies */
import calculateZoomData from 'utils/calculateZoomData';
import restrictNumber from 'utils/restrictNumber';

export const ZOOM_CANVAS = 'ZOOM_CANVAS';

const MIN_ZOOM_FACTOR = 0.05;
const MAX_ZOOM_FACTOR = 55;

const zoomCanvas = (state, payload) => {
  const newZoomFactor = restrictNumber(
    parseFloat(payload.factor).toFixed(2),
    MIN_ZOOM_FACTOR,
    MAX_ZOOM_FACTOR,
  );

  let newZoomData;

  if (payload.preparedDimensions) {
    const { preparedDimensions, ...zoomProps } = payload;
    newZoomData = zoomProps;
  } else {
    const newZoomPoint = {
      x:
        !payload.x && payload.x !== 0
          ? state.canvasWidth / 2
          : payload.x ?? state.zoom.x,
      y:
        !payload.y && payload.y !== 0
          ? state.canvasHeight / 2
          : payload.y ?? state.zoom.y,
    };

    newZoomData = calculateZoomData(
      { ...newZoomPoint, factor: newZoomFactor },
      state.zoom,
      state.canvasWidth,
      state.canvasHeight,
    );
  }

  return newZoomData.factor === state.zoom.factor &&
    newZoomData.x === state.zoom.x &&
    newZoomData.y === state.zoom.y
    ? state
    : {
        ...state,
        zoom: { ...state.zoom, ...newZoomData },
      };
};

export default zoomCanvas;

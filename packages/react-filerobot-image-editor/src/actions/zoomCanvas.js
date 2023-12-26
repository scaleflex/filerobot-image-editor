/** Internal Dependencies */
import calculateZoomData from 'utils/calculateZoomData';
import { DEFAULT_ZOOM_FACTOR } from 'utils/constants';
import restrictNumber from 'utils/restrictNumber';

export const ZOOM_CANVAS = 'ZOOM_CANVAS';

const MIN_ZOOM_FACTOR = 0.03;
const MAX_ZOOM_FACTOR = 60;

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
      // `isAbsoluteZoom` means we don't depend on the old zoom, and we are going to zoom & pan assuming it's happening for firsst time.
      payload.isAbsoluteZoom
        ? { factor: DEFAULT_ZOOM_FACTOR, x: null, y: null }
        : state.zoom,
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

/** Internal Dependencies */
import restrictNumber from 'utils/restrictNumber';

export const ZOOM_CANVAS = 'ZOOM_CANVAS';

const MIN_ZOOM_FACTOR = 1;
const MAX_ZOOM_FACTOR = 10;

const zoomCanvas = (state, payload) => {
  const newZoomFactor = restrictNumber(
    parseFloat(state.zoom.factor + payload.zoomBy).toFixed(1),
    MIN_ZOOM_FACTOR,
    MAX_ZOOM_FACTOR,
  );

  return newZoomFactor === state.zoom.factor
    // && state.zoom.xPoint === payload.xPoint
    // && state.zoom.yPoint === payload.yPoint
    ? state
    : {
      ...state,
      zoom: {
        factor: newZoomFactor,
        xPoint: newZoomFactor === 1 ? null : payload.xPoint ?? state.zoom.xPoint,
        yPoint: newZoomFactor === 1 ? null : payload.yPoint ?? state.zoom.yPoint,
      },
    };
};

export default zoomCanvas;

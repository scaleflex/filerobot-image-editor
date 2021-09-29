import getDimensionsMinimalRatio from 'utils/getDimensionsMinimalRatio';
import restrictNumber from 'utils/restrictNumber';

export const SET_CANVAS_SIZE = 'SET_CANVAS_SIZE';

const MIN_CANVAS_DIMENSION_PX = 80;

const setCanvasSize = (state, payload) => {
  if (
    state.canvasWidth === payload.canvasWidth &&
    state.canvasHeight === payload.canvasHeight
  ) {
    return state;
  }

  const restrictedWidth = restrictNumber(
    payload.canvasWidth,
    MIN_CANVAS_DIMENSION_PX,
    state.originalImage.width,
  );

  const restrictedHeight = restrictNumber(
    payload.canvasHeight,
    MIN_CANVAS_DIMENSION_PX,
    state.originalImage.height,
  );

  const {
    initialCanvasWidth = restrictedWidth,
    initialCanvasHeight = restrictedHeight,
  } = state;

  const originalImageInitialScale = getDimensionsMinimalRatio(
    state.initialCanvasWidth,
    state.initialCanvasHeight,
    state.originalImage.width,
    state.originalImage.height,
  );
  const originalImageInitialResizedWidth =
    originalImageInitialScale * state.originalImage.width;
  const originalImageInitialResizedHeight =
    originalImageInitialScale * state.originalImage.height;

  let scale = 1;
  if (
    initialCanvasWidth !== payload.canvasWidth ||
    initialCanvasHeight !== payload.canvasHeight
  ) {
    const widthScale = payload.canvasWidth / originalImageInitialResizedWidth;
    const heightScale =
      payload.canvasHeight / originalImageInitialResizedHeight;
    scale = Math.min(widthScale, heightScale);
  }

  return {
    ...state,
    initialCanvasWidth,
    initialCanvasHeight,
    canvasWidth: restrictedWidth,
    canvasHeight: restrictedHeight,
    canvasScale: scale,
  };
};

export default setCanvasSize;

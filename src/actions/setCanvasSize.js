/** Internal Dependencies */
import getDimensionsMinimalRatio from 'utils/getDimensionsMinimalRatio';

export const SET_CANVAS_SIZE = 'SET_CANVAS_SIZE';

const setCanvasSize = (state, payload) => {
  if (
    state.canvasWidth === payload.canvasWidth &&
    state.canvasHeight === payload.canvasHeight
  ) {
    return state;
  }

  /** if enabled, it wouldn't increase the image size in the container to be more clear for the user to edit the image....
   * which means if the image is small it would be hard to edit after having this enabled...
   * is should replace payload.canvasWidth & payload.canvasHeight in the code afterwards..
   * also it might cause some improper behavior that needs to be debugged if generated.
   */
  // const restrictedWidth = restrictNumber(
  //   payload.canvasWidth,
  //   0,
  //   state.originalImage.width
  // );

  // const restrictedHeight = restrictNumber(
  //   payload.canvasHeight,
  //   0,
  //   state.originalImage.height
  // );

  const {
    initialCanvasWidth = payload.canvasWidth,
    initialCanvasHeight = payload.canvasHeight,
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
    canvasWidth: payload.canvasWidth,
    canvasHeight: payload.canvasHeight,
    canvasScale: scale,
  };
};

export default setCanvasSize;

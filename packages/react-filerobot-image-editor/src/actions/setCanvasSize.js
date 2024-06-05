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
  //   state.originalSource.width
  // );

  // const restrictedHeight = restrictNumber(
  //   payload.canvasHeight,
  //   0,
  //   state.originalSource.height
  // );

  const {
    initialCanvasWidth = payload.canvasWidth,
    initialCanvasHeight = payload.canvasHeight,
  } = state;

  const originalSourceInitialScale = getDimensionsMinimalRatio(
    state.initialCanvasWidth,
    state.initialCanvasHeight,
    state.originalSource.width,
    state.originalSource.height,
  );
  const originalSourceInitialResizedWidth =
    originalSourceInitialScale * state.originalSource.width;
  const originalSourceInitialResizedHeight =
    originalSourceInitialScale * state.originalSource.height;

  let scale = 1;
  if (
    initialCanvasWidth !== payload.canvasWidth ||
    initialCanvasHeight !== payload.canvasHeight
  ) {
    const widthScale = payload.canvasWidth / originalSourceInitialResizedWidth;
    const heightScale =
      payload.canvasHeight / originalSourceInitialResizedHeight;
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

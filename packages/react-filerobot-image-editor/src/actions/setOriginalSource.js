/** Internal dependencies */
import calculateZoomData from 'utils/calculateZoomData';
import { DEFAULT_ZOOM_FACTOR } from 'utils/constants';
import getOriginalSourceInitialScale from 'utils/getOriginalSourceInitialScale';
import getShownImageZoomPercentage from 'utils/getShownImageZoomPercentage';

export const SET_ORIGINAL_SOURCE = 'SET_ORIGINAL_SOURCE';

const isNewImg = (state, payload) =>
  state.originalSource?.width !== payload.originalSource?.width ||
  state.originalSource?.height !== payload.originalSource.height ||
  (payload.originalSource.src &&
    state.originalSource?.src !== payload.originalSource.src);

const setOriginalSource = (state, payload) => {
  const isFirstTimeToAddSource = !state.originalSource;

  let zoom = payload.zoom || state.zoom;
  if (
    payload.keepPrevZoomRatio &&
    !isFirstTimeToAddSource &&
    isNewImg(state, payload)
  ) {
    // TODO: Maybe we move the originalSourceInitialScale from the DesignLayerWrapper to this place?
    // but first load it is not defined here cause the canvas size wasn't defined it.
    const newSourceInitialScale = getOriginalSourceInitialScale({
      initialCanvasWidth: state.initialCanvasWidth,
      initialCanvasHeight: state.initialCanvasHeight,
      originalSource: payload.originalSource,
    });

    const factor =
      getShownImageZoomPercentage(state) / 100 / newSourceInitialScale;
    zoom = calculateZoomData(
      { ...zoom, x: state.canvasWidth / 2, y: state.canvasHeight / 2, factor },
      { factor: DEFAULT_ZOOM_FACTOR, x: null, y: null, customLabel: null },
      state.canvasWidth,
      state.canvasHeight,
    );
  }

  return {
    ...state,
    isDesignState: !isFirstTimeToAddSource && !payload.dismissHistory,
    feedback: {},
    zoom,
    presentOriginalSources: {
      ...state.presentOriginalSources,
      [payload.originalSource.key || 'default']: payload.originalSource,
    },
    originalSource: payload.originalSource,
    imgSrc: payload.originalSource.src,
    bgColor: payload.originalSource.bgColor,
  };
};

export default setOriginalSource;

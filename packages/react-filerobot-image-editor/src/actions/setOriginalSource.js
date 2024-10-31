export const SET_ORIGINAL_SOURCE = 'SET_ORIGINAL_SOURCE';

const setOriginalSource = (state, payload) => {
  const isFirstTimeToAddSource = !state.originalSource;

  return {
    ...state,
    isDesignState: !isFirstTimeToAddSource && !payload.dismissHistory,
    feedback: {},
    zoom:
      payload.zoom &&
      (state.originalSource?.width !== payload.originalSource?.width ||
        state.originalSource?.height !== payload.originalSource.height ||
        (payload.originalSource.src &&
          state.originalSource?.src !== payload.originalSource.src))
        ? payload.zoom
        : state.zoom,
    presentOriginalSources: {
      ...state.presentOriginalSources,
      [payload.originalSource.key || 'default']: payload.originalSource,
    },
    originalSource: payload.originalSource,
    sourceType: payload.sourceType,
    imgSrc: payload.originalSource.src,
    bgColor: payload.originalSource.bgColor,
  };
};

export default setOriginalSource;

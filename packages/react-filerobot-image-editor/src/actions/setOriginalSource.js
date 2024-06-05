export const SET_ORIGINAL_SOURCE = 'SET_ORIGINAL_SOURCE';

const setOriginalSource = (state, payload) => {
  const isFirstTimeToAddSource = !state.originalSource;

  return {
    ...state,
    isDesignState: !isFirstTimeToAddSource && !payload.dismissHistory,
    feedback: {},
    allOriginalSources: [...state.allOriginalSources, payload.originalSource],
    originalSource: payload.originalSource,
    imgSrc: payload.originalSource.src,
    bgColor: payload.originalSource.bgColor,
  };
};

export default setOriginalSource;

/** Internal Dependencies */
import { DEFAULT_ZOOM_FACTOR } from 'utils/constants';
import extractCurrentDesignState from 'utils/extractCurrentDesignState';

export const RESET = 'RESET';

const reset = (state, payload) => {
  const resettedDesignState = extractCurrentDesignState(
    {
      ...payload.config,
      imgSrc:
        (state.allOriginalSources[0] || state.originalSource).src ||
        state.imgSrc,
      bgColor: (state.allOriginalSources[0] || state.originalSource).bgColor,
      originalSource: state.allOriginalSources[0] || state.originalSource,
    },
    true,
  );

  return {
    ...state,
    ...resettedDesignState,
    zoom: {
      factor: DEFAULT_ZOOM_FACTOR,
      x: null,
      y: null,
    },
    selectionsIds: [],
    isResetted: true,
    pastDesignStates: [],
    futureDesignStates: [],
    hasUndo: false,
    hasRedo: false,
    haveNotSavedChanges: false,
  };
};

export default reset;

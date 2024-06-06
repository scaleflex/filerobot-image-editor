/** Internal Dependencies */
import { DEFAULT_ZOOM_FACTOR } from 'utils/constants';
import extractCurrentDesignState from 'utils/extractCurrentDesignState';

export const RESET = 'RESET';

const reset = (state, payload) => {
  const firstOriginalSource =
    state.pastDesignStates[0]?.originalSource || state.originalSource;

  const resettedDesignState = extractCurrentDesignState(
    {
      ...payload.config,
      imgSrc: firstOriginalSource.src || state.imgSrc,
      bgColor: firstOriginalSource.bgColor,
      originalSource: firstOriginalSource,
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

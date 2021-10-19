/** Internal Dependencies */
import extractCurrentDesignState from 'utils/extractCurrentDesignState';

export const RESET = 'RESET';

const reset = (state) => {
  const resettedDesignState = extractCurrentDesignState({});

  return {
    ...state,
    ...resettedDesignState,
    selectionsIds: [],
    isResetted: true,
    pastDesignStates: [],
    futureDesignStates: [],
    hasUndo: false,
    hasRedo: false,
  };
};

export default reset;

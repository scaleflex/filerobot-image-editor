/** Internal Dependencies */
import extractCurrentDesignState from 'utils/extractCurrentDesignState';

export const RESET = 'RESET';

const reset = (state) => {
  const resettedDesignState = extractCurrentDesignState({
    imageSrc: state.imageSrc,
  });

  return {
    ...state,
    ...resettedDesignState,
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

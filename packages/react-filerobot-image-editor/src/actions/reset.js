/** Internal Dependencies */
import extractCurrentDesignState from 'utils/extractCurrentDesignState';

export const RESET = 'RESET';

const reset = (state, payload) => {
  const resettedDesignState = extractCurrentDesignState(
    {
      ...payload.config,
      imgSrc: state.imgSrc,
    },
    true,
  );

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

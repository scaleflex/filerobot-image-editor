/** Internal Dependencies */
import extractCurrentDesignState from 'utils/extractCurrentDesignState';

export const UNDO = 'UNDO';

const undo = (state) => {
  if (state.pastDesignStates && state.pastDesignStates.length > 0) {
    const currentDesignState = extractCurrentDesignState(state);
    const [presentDesignState, ...newPastDesignStates] = state.pastDesignStates;
    const newFutureDesignStates = [
      currentDesignState,
      ...(state.futureDesignStates || []),
    ];

    return {
      ...state,
      ...presentDesignState,
      selectionsIds: [],
      pastDesignStates: newPastDesignStates,
      futureDesignStates: newFutureDesignStates,
      hasUndo: newPastDesignStates.length > 0,
      hasRedo: true,
      haveNotSavedChanges: newPastDesignStates.length > 0,
    };
  }

  return state;
};

export default undo;

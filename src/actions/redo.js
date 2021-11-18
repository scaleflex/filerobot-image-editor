/** Internal Dependencies */
import extractCurrentDesignState from 'utils/extractCurrentDesignState';

export const REDO = 'REDO';

const redo = (state) => {
  if (state.futureDesignStates && state.futureDesignStates.length > 0) {
    const currentDesignState = extractCurrentDesignState(state);
    const [presentDesignState, ...newFutureDesignStates] =
      state.futureDesignStates;
    const newPastDesignStates = [
      currentDesignState,
      ...(state.pastDesignStates || []),
    ];

    return {
      ...state,
      ...presentDesignState,
      selectionsIds: [],
      pastDesignStates: newPastDesignStates,
      futureDesignStates: newFutureDesignStates,
      hasUndo: true,
      hasRedo: newFutureDesignStates.length > 0,
      haveNotSavedChanges: true,
    };
  }

  return state;
};

export default redo;

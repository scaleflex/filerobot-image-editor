/** External Dependencies */
import { useReducer } from 'react';

/** Internal Dependencies */
import { REDO, RESET, UNDO } from 'actions';
import extractCurrentDesignState from 'utils/extractCurrentDesignState';

let timeout;

/**
 * A normal react useReducer wrapped inside our own UNDO/REDO Reducer as middleware
 * for updating the UNDO/REDO states automatically
 *
 */
// TODO: maybe? make another reducer/context for design state and having the undo/redo to it only.
const useAppReducer = (reducer, initialState, passedConfig = {}) => {
  const initialStateWithUndoRedo = {
    ...initialState,
    pastDesignStates: [],
    futureDesignStates: [],
    hasRedo: false,
    hasUndo: false,
  };

  const undoRedoResetReducer = (state, action) => {
    const newPresentState = reducer(state, action) || initialStateWithUndoRedo;

    if ([UNDO, REDO, RESET].includes(action.type)) {
      return newPresentState;
    }

    if (newPresentState.isDesignState) {
      const currentState = extractCurrentDesignState(state);
      const { isDesignState, ...neededNewPresentState } = newPresentState;

      const newState = {
        ...neededNewPresentState,
        pastDesignStates: [currentState, ...state.pastDesignStates],
        hasUndo: true,
        hasRedo: false,
        futureDesignStates: [],
        isResetted: false,
        haveNotSavedChanges: true,
      };

      timeout = setTimeout(() => {
        clearTimeout(timeout);
        if (typeof passedConfig.onModify === 'function') {
          passedConfig.onModify(newState);
        }
      });

      return newState;
    }

    return newPresentState;
  };

  return useReducer(undoRedoResetReducer, initialStateWithUndoRedo);
};

export default useAppReducer;

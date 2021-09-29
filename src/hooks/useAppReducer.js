/** Internal Dependencies */
import { REDO, RESET, UNDO } from 'actions';
import redo from 'actions/redo';
import reset from 'actions/reset';
import undo from 'actions/undo';
import { useReducer } from 'react';
import extractCurrentDesignState from 'utils/extractCurrentDesignState';

/**
 * A normal react useReducer wrapped inside our own UNDO/REDO Reducer as middleware
 * for updating the UNDO/REDO states automatically
 *
 */
// TODO: make another reducer/context for design state and having the undo/redo to it only.
const useAppReducer = (reducer, initialState) => {
  const initialStateWithUndoRedo = {
    ...initialState,
    pastDesignStates: [],
    futureDesignStates: [],
    hasRedo: false,
    hasUndo: false,
  };

  const undoRedoResetReducer = (state, action) => {
    const newPresentState = reducer(state, action) || initialStateWithUndoRedo;

    if (action.type === UNDO) {
      return undo(state) || state;
    }

    if (action.type === REDO) {
      return redo(state) || state;
    }

    if (action.type === RESET) {
      return reset(state) || state;
    }

    if (newPresentState.isDesignState) {
      const currentState = extractCurrentDesignState(state);
      const { isDesignState, ...neededNewPresentState } = newPresentState;

      return {
        ...neededNewPresentState,
        pastDesignStates: [currentState, ...state.pastDesignStates],
        hasUndo: true,
        hasRedo: false,
        futureDesignStates: [],
        isResetted: false,
      };
    }

    return newPresentState;
  };

  return useReducer(undoRedoResetReducer, initialStateWithUndoRedo);
};

export default useAppReducer;

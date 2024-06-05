/** External Dependencies */
import { useReducer } from 'react';

/** Internal Dependencies */
import { REDO, RESET, UNDO } from 'actions';
import extractCurrentDesignState from 'utils/extractCurrentDesignState';
import isFunction from 'utils/isFunction';

let timeout;

const applyCallbackFn = (callback, newState) => {
  timeout = setTimeout(() => {
    clearTimeout(timeout);
    if (isFunction(callback) && newState) {
      callback(newState);
    }
  });
};

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
      let actionCallback;
      if (action.type === UNDO) {
        actionCallback = passedConfig.onUndo;
      }
      if (action.type === REDO) {
        actionCallback = passedConfig.onRedo;
      }
      if (action.type === RESET) {
        actionCallback = passedConfig.onReset;
      }

      applyCallbackFn(passedConfig.onModify, newPresentState);
      applyCallbackFn(actionCallback, newPresentState);
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

      applyCallbackFn(passedConfig.onModify, newState);

      return newState;
    }

    return newPresentState;
  };

  return useReducer(undoRedoResetReducer, initialStateWithUndoRedo);
};

export default useAppReducer;

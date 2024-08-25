/** External Dependencies */
import { useReducer } from 'react';

/** Internal Dependencies */
import { REDO, RESET, UNDO } from 'actions';
import extractCurrentDesignState from 'utils/extractCurrentDesignState';
import isFunction from 'utils/isFunction';
import emitCustomEvent from 'utils/emitCustomEvent';
import { EVENTS } from 'utils/constants';

const applyCallbackFn = (callback, newState) => {
  setTimeout(() => {
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
// TODO: Maybe we remove onModify, onUndo, onRedo, onReset functions since we are having the event emitter?
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
        emitCustomEvent(EVENTS.DESIGN_UNDO, newPresentState);
      }
      if (action.type === REDO) {
        actionCallback = passedConfig.onRedo;
        emitCustomEvent(EVENTS.DESIGN_REDO, newPresentState);
      }
      if (action.type === RESET) {
        actionCallback = passedConfig.onReset;
        emitCustomEvent(EVENTS.DESIGN_RESET, newPresentState);
      }

      emitCustomEvent(EVENTS.DESIGN_UPDATE, newPresentState);
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

      emitCustomEvent(EVENTS.DESIGN_UPDATE, newState);
      applyCallbackFn(passedConfig.onModify, newState);

      return newState;
    }

    return newPresentState;
  };

  return useReducer(undoRedoResetReducer, initialStateWithUndoRedo);
};

export default useAppReducer;

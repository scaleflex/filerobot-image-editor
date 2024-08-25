/** External dependencies */
import { useCallback } from 'react';

/** Internal dependencies */
import {
  UNDO,
  REDO,
  INJECT_INTO_LAST_STATE,
  RESET,
  UPDATE_EXTRA_STATE,
} from 'actions';
import useStore from './useStore';
import useDispatch from './useDispatch';

const useManageHistoryState = () => {
  const dispatch = useDispatch();
  const {
    hasUndo = false,
    hasRedo = false,
    isResetted = true,
    haveNotSavedChanges = false,
    pastDesignStates = [],
    futureDesignStates = [],
    config,
  } = useStore();

  const undo = useCallback(() => {
    dispatch({ type: UNDO });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: REDO });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: RESET, payload: { config } });
  }, [config]);

  const injectIntoLastState = (payload) => {
    if (!payload) {
      return;
    }

    dispatch({
      type: INJECT_INTO_LAST_STATE,
      payload,
    });
  };

  const updateExtraState = (payload) => {
    if (!payload) {
      return;
    }

    dispatch({
      type: UPDATE_EXTRA_STATE,
      payload: {
        dismissHistory: false,
        ...payload,
      },
    });
  };

  return {
    undo,
    redo,
    reset,
    injectIntoLastState,
    updateExtraState,
    hasUndo,
    hasRedo,
    isResetted,
    haveNotSavedChanges,
    pastDesignStates,
    futureDesignStates,
  };
};

export default useManageHistoryState;

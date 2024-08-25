/** Internal Dependencies */
import deepMerge from 'utils/deepMerge';

export const INJECT_INTO_LAST_STATE = 'INJECT_INTO_LAST_STATE';

const injectIntoLastState = (
  state,
  { considerArrayInDeepMerge, ...payload },
) => {
  if (Object.keys(payload).length > 0) {
    const updatedLastState = deepMerge(
      state.pastDesignStates?.[0] || {},
      payload,
      considerArrayInDeepMerge,
    );

    return {
      ...state,
      pastDesignStates: [updatedLastState, ...(state.pastDesignStates || [])],
      hasUndo: true,
      isResetted: false,
      haveNotSavedChanges: true,
    };
  }

  return state;
};

export default injectIntoLastState;

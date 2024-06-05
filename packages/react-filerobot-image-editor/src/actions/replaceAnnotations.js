import deepMerge from 'utils/deepMerge';

export const REPLACE_ANNOTATIONS = 'REPLACE_ANNOTATIONS';

const replaceAnnotations = (state, payload = {}) => {
  // dismissHistory is used to prevent considering this change in history (undo/redo).
  const {
    dismissHistory = false,
    applyDeepMerge = false,
    considerArrayInDeepMerge = false,
    ...newAnnotations
  } = payload;

  if (!newAnnotations) {
    return state;
  }

  return {
    ...state,
    isDesignState: !dismissHistory, // not stored in state, used in reducer to consider in undo/redo stacks
    annotations: applyDeepMerge
      ? deepMerge(state.annotations, newAnnotations, considerArrayInDeepMerge)
      : newAnnotations,
  };
};

export default replaceAnnotations;

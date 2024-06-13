import { EVENTS } from 'utils/constants';
import deepMerge from 'utils/deepMerge';
import emitCustomEvent from 'utils/emitCustomEvent';

export const REPLACE_ANNOTATIONS = 'REPLACE_ANNOTATIONS';

const replaceAnnotations = (state, payload = {}) => {
  // dismissHistory is used to prevent considering this change in history (undo/redo).
  const {
    dismissHistory = false,
    applyDeepMerge = false,
    considerArrayInDeepMerge = false,
    newAnnotations,
  } = payload;

  if (!newAnnotations) {
    return state;
  }

  const replacedAnnotations = applyDeepMerge
    ? deepMerge(state.annotations, newAnnotations, considerArrayInDeepMerge)
    : newAnnotations;

  emitCustomEvent(EVENTS.ANNOTATIONS_REPLACE, {
    annotations: replacedAnnotations,
  });

  return {
    ...state,
    isDesignState: !dismissHistory, // not stored in state, used in reducer to consider in undo/redo stacks
    annotations: replacedAnnotations,
  };
};

export default replaceAnnotations;

import { EVENTS } from 'utils/constants';
import emitCustomEvent from 'utils/emitCustomEvent';
import randomId from 'utils/randomId';

export const SET_ANNOTATION = 'SET_ANNOTATION';

const setAnnotation = (state, payload = {}) => {
  // dismissHistory is used to prevent considering this change in history (undo/redo).
  const {
    dismissHistory = false,
    replaceCurrent = false,
    onAnnotationAdd,
    ...newAnnotationData
  } = payload;
  const annotationId = newAnnotationData.id ?? randomId(newAnnotationData.name);

  let newAnnotation = { ...newAnnotationData, id: annotationId };

  const existedAnnotation = state.annotations[annotationId];

  if (onAnnotationAdd === 'function') {
    const moreAnnotationData = onAnnotationAdd(newAnnotation, {
      existedAnnotation,
      state,
    });

    newAnnotation = { ...newAnnotation, ...moreAnnotationData };
  }

  // If annotation not changed don't update it.
  if (
    existedAnnotation &&
    !Object.keys(newAnnotation).some(
      (key) =>
        typeof newAnnotation[key] !== 'undefined' &&
        newAnnotation[key] !== existedAnnotation[key],
    )
  ) {
    return state;
  }

  const addedAnnotation = {
    ...(replaceCurrent ? {} : existedAnnotation),
    ...newAnnotation,
  };

  emitCustomEvent(
    existedAnnotation ? EVENTS.ANNOTATION_EDITED : EVENTS.ANNOTATION_ADDED,
    addedAnnotation,
  );

  return {
    ...state,
    isDesignState: !dismissHistory, // not stored in state, used in reducer to consider in undo/redo stacks
    annotations: {
      ...state.annotations,
      [annotationId]: addedAnnotation,
    },
  };
};

export default setAnnotation;

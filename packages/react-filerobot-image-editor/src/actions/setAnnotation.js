/** Internal dependencies */
import { EVENTS } from 'utils/constants';
import emitCustomEvent from 'utils/emitCustomEvent';
import randomId from 'utils/randomId';

export const SET_ANNOTATION = 'SET_ANNOTATION';

const setAnnotation = (state, payload = {}) => {
  // dismissHistory is used to prevent considering this change in history (undo/redo).
  const {
    dismissHistory = false,
    replaceCurrent = false,
    selectOnSet = false,
    onAnnotationAdd,
    ...newAnnotationData
  } = payload;
  const annotationId = newAnnotationData.id ?? randomId(newAnnotationData.name);

  const existedAnnotation = state.annotations[annotationId] || {};
  const isNewAnnotation = Object.keys(existedAnnotation).length === 0;

  let newAnnotation = {
    ...newAnnotationData,
    ...(isNewAnnotation && {
      order: state.annotationIds.length,
    }),
    id: annotationId,
  };

  if (
    (replaceCurrent || isNewAnnotation) &&
    typeof onAnnotationAdd === 'function'
  ) {
    const moreAnnotationData = onAnnotationAdd(newAnnotation, state);
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

  const annotation = {
    ...(replaceCurrent ? {} : existedAnnotation),
    ...newAnnotation,
  };

  emitCustomEvent(
    existedAnnotation ? EVENTS.ANNOTATION_EDIT : EVENTS.ANNOTATION_ADD,
    { annotation },
  );

  return {
    ...state,
    isDesignState: !dismissHistory, // not stored in state, used in reducer to consider in undo/redo stacks
    annotationIds: isNewAnnotation
      ? [...state.annotationIds, annotation.id]
      : state.annotationIds,
    annotations: {
      ...state.annotations,
      [annotation.id]: annotation,
    },
    selectionsIds: selectOnSet ? [annotation.id] : state.selectionsIds,
  };
};

export default setAnnotation;

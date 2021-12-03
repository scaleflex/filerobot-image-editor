import randomId from 'utils/randomId';

export const SET_ANNOTATION = 'SET_ANNOTATION';

const setAnnotation = (state, payload = {}) => {
  // dismissHistory is used to prevent considering this change in history (undo/redo).
  const {
    dismissHistory = false,
    replaceCurrent = false,
    ...newAnnotation
  } = payload;
  const annotationId = newAnnotation.id ?? randomId(newAnnotation.name);

  const existedAnnotation = state.annotations[annotationId];
  // If annotation not changed don't update it.
  if (
    existedAnnotation &&
    !Object.keys(newAnnotation).some(
      (key) =>
        (newAnnotation[key] || newAnnotation[key] === 0) &&
        newAnnotation[key] !== existedAnnotation[key],
    )
  ) {
    return state;
  }

  return {
    ...state,
    isDesignState: !dismissHistory, // not stored in state, used in reducer to consider in undo/redo stacks
    annotations: {
      ...state.annotations,
      [annotationId]: {
        ...(replaceCurrent ? {} : existedAnnotation),
        ...newAnnotation,
      },
    },
  };
};

export default setAnnotation;

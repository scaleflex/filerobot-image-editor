export const SELECT_ANNOTATION = 'SELECT_ANNOTATION';

const selectAnnotation = (state, payload) => {
  if (
    state.selectionsIds.length === 1 &&
    state.selectionsIds[0] === payload.annotationId
  ) {
    return state;
  }

  let newSelectionsIds;
  if (payload.multiple) {
    newSelectionsIds = state.selectionsIds.filter(
      (id) => id !== payload.annotationId,
    );

    const wasAnnotationAlreadySelected =
      newSelectionsIds.length !== state.selectionsIds.length;
    if (!wasAnnotationAlreadySelected) {
      newSelectionsIds.push(payload.annotationId);
    }
  } else {
    newSelectionsIds = [payload.annotationId];
  }

  return {
    ...state,
    selectionsIds: newSelectionsIds,
  };
};

export default selectAnnotation;

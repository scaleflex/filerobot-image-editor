/** Internal Dependencies */
import { POINTER_MODES } from 'utils/constants';

export const SELECT_ADDED_ANNOTATION = 'SELECT_ADDED_ANNOTATION';

const selectAddedAnnotation = (state, payload) => {
  if (
    (
      state.pointerMode !== POINTER_MODES.GRAB
      && state.pointerMode !== POINTER_MODES.SELECT
    ) || (state.selectionsIds.length === 1 && state.selectionsIds[0] === payload.annotationId)
  ) {
    return state;
  }

  let newSelectionsIds;
  if (payload.multiple) {
    newSelectionsIds = state.selectionsIds
      .filter((id) => id !== payload.annotationId);

    const wasAnnotationAlreadySelected = newSelectionsIds.length !== state.selectionsIds.length;
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

export default selectAddedAnnotation;

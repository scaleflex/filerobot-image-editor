import { EVENTS } from 'utils/constants';
import emitCustomEvent from 'utils/emitCustomEvent';

export const CLEAR_ANNOTATIONS_SELECTIONS = 'CLEAR_ANNOTATIONS_SELECTIONS';

const clearAnnotationsSelections = (state) => {
  if (state.selectionsIds.length === 0) {
    return state;
  }

  emitCustomEvent(EVENTS.ANNOTATIONS_DESELECT);

  return {
    ...state,
    selectionsIds: [],
  };
};

export default clearAnnotationsSelections;

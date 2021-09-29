export const CLEAR_ANNOTATIONS_SELECTIONS = 'CLEAR_ANNOTATIONS_SELECTIONS';

const clearAnnotationsSelections = (state, payload) => (
  state.selectionsIds.length === 0
    ? state
    : ({
      ...state,
      selectionsIds: [],
    })
);

export default clearAnnotationsSelections;

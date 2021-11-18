export const SET_SAVED = 'SET_SAVED';

const setSaved = (state) =>
  !state.haveNotSavedChanges ? state : { ...state, haveNotSavedChanges: false };

export default setSaved;

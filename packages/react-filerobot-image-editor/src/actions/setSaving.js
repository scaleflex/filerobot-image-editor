export const SET_SAVING = 'SET_SAVING';

const setSaving = (state, payload) => ({
  ...state,
  isSaving: payload.isSaving,
  isLoadingGlobally: payload.isLoadingGlobally,
});

export default setSaving;

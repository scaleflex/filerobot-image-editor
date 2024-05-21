export const SET_SAVING = 'SET_SAVING';

const setSaving = (state, payload) => ({
  ...state,
  isSaving: payload.isSaving,
  isLoadingGlobally: payload.isSaving,
});

export default setSaving;

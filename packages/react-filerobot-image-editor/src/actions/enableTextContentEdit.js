export const ENABLE_TEXT_CONTENT_EDIT = 'ENABLE_TEXT_CONTENT_EDIT';

const enableTextContentEdit = (state, payload) => ({
  ...state,
  textIdOfEditableContent: payload.textIdOfEditableContent || null,
  selectionsIds: [],
});

export default enableTextContentEdit;

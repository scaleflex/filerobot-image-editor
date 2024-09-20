export const SET_SELECTED_TEXT_PART = 'SET_SELECTED_TEXT_PART';

const setSelectedTextPart = (state, payload) => ({
  ...state,
  selectedTextPart: {
    hasSelection: payload.hasSelection ?? false,
    textContent: payload.textContent || '',
    element: payload.element || null,
    startIndex: payload.startIndex ?? null,
    endIndex: payload.endIndex ?? null,
  },
});

export default setSelectedTextPart;

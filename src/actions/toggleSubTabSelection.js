export const TOGGLE_SUB_TAB_SELECTION = 'TOGGLE_SUB_TAB_SELECTION';

const toggleSubTabSelection = (state, payload) => ({
  ...state,
  subTab: payload.item,
});

export default toggleSubTabSelection;

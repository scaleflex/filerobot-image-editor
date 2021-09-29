export const SELECT_TAB = 'SELECT_TAB';

const selectTab = (state, payload) => (
  payload.tabId === state.tabId
    ? state
    : ({
      ...state,
      tabId: payload.tabId,
      toolId: null,
    })
);

export default selectTab;

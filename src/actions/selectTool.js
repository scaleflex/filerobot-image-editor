export const SELECT_TOOL = 'SELECT_TOOL';

const selectTool = (state, payload) => (
  state.toolId === payload.toolId
    ? state
    : {
      ...state,
      toolId: payload.toolId,
    }
);

export default selectTool;

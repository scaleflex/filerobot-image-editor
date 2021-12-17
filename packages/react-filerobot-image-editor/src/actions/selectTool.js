export const SELECT_TOOL = 'SELECT_TOOL';

const selectTool = (state, payload) =>
  state.toolId === payload.toolId
    ? state
    : {
        ...state,
        toolId: payload.toolId,
        selectionsIds: payload.keepSelections ? state.selectionsIds : [],
      };

export default selectTool;

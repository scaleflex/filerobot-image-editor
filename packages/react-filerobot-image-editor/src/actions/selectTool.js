export const SELECT_TOOL = 'SELECT_TOOL';

const selectTool = (state, payload) => {
  console.log('selectTool', {payload, state});
  return state.toolId === payload.toolId
    ? state
    : {
        ...state,
        toolId: payload.toolId,
        selectionsIds: payload.keepSelections ? state.selectionsIds : [],
      };
}

export default selectTool;

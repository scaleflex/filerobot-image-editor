export const SELECT_TOOL = 'SELECT_TOOL';

const selectTool = (state, payload) => {
  return state.toolId === payload.toolId
    ? {
        ...state,
        ...(payload?.dynamicButtons && {
          dynamicCropToolId: payload.dynamicCropToolId,
        }),
      }
    : {
        ...state,
        toolId: payload.toolId,
        selectionsIds: payload.keepSelections ? state.selectionsIds : [],
        ...(payload?.dynamicButtons && {
          dynamicCropToolId: payload.dynamicCropToolId,
        }),
      };
};
export default selectTool;

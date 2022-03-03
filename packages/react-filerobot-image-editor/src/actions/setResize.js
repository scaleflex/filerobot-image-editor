export const SET_RESIZE = 'SET_RESIZE';

const setResize = (state, payload) => ({
  ...state,
  isDesignState: !payload.dismissHistory,
  resize: {
    ...state.resize,
    // width, height, manualChangeDisabled (false by default), ratioUnlocked (locked by default).
    ...payload,
    manualChangeDisabled: payload.manualChangeDisabled ?? false,
  },
});

export default setResize;

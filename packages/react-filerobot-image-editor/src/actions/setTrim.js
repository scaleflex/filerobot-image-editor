export const SET_TRIM = 'SET_TRIM';

const setTrim = (state, payload) => ({
  ...state,
  isDesignState: !payload.dismissHistory,
  trim: {
    ...state.trim,
    segments: payload.segments,
  },
});

export default setTrim;

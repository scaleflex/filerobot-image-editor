export const SET_LATEST_COLOR = 'SET_LATEST_COLOR';

const setLatestColor = (state, payload) => ({
  ...state,
  latestColors: {
    ...state.latestColors,
    ...payload.latestColors,
  },
});

export default setLatestColor;

export const SET_LATEST_COLOR = 'SET_LATEST_COLOR';
export const SET_LATEST_TEXT_COLOR = 'SET_LATEST_TEXT_COLOR';

const setLatestColor = (state, payload) => ({
  ...state,
  latestColors: {
    ...state.latestColors,
    ...payload.latestColors,
  },
});

export const setLatestTextColor = (state, payload) => ({
  ...state,
  latestTextColors: {
    ...state.latestTextColors,
    ...payload.latestTextColors,
  },
})

export default setLatestColor;

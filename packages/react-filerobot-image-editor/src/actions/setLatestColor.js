export const SET_LATEST_COLOR = 'SET_LATEST_COLOR';

const setLatestColor = (state, payload) =>
  state.latestColor === payload.latestColor
    ? state
    : {
        ...state,
        latestColor: payload.latestColor,
      };

export default setLatestColor;

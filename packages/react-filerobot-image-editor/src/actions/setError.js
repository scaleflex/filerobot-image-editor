export const SET_ERROR = 'SET_ERROR';

const setError = (state, payload) => ({
  ...state,
  isLoadingGlobally: false,
  error: payload.error,
});

export default setError;

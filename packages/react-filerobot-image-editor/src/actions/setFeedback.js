export const SET_FEEDBACK = 'SET_FEEDBACK';

const setFeedback = (state, payload) => ({
  ...state,
  isLoadingGlobally: false,
  feedback: payload.feedback || {},
});

export default setFeedback;

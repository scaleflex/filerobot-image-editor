export const HIDE_LOADER = 'HIDE_LOADER';

const hideLoader = (state, payload) => ({
  ...state,
  isLoadingGlobally: false,
});

export default hideLoader;

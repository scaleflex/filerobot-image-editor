export const HIDE_LOADER = 'HIDE_LOADER';

const hideLoader = (state) => ({
  ...state,
  isLoadingGlobally: false,
});

export default hideLoader;

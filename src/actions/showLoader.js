export const SHOW_LOADER = 'SHOW_LOADER';

const showLoader = (state, payload) => ({
  ...state,
  isLoadingGlobally: true,
});

export default showLoader;

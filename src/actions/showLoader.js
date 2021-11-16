export const SHOW_LOADER = 'SHOW_LOADER';

const showLoader = (state) => ({
  ...state,
  isLoadingGlobally: true,
});

export default showLoader;

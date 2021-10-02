export const SET_ORIGINAL_IMAGE = 'SET_ORIGINAL_IMAGE';

const setOriginalImage = (state, payload) => ({
  ...state,
  error: null,
  isLoadingGlobally: false,
  originalImage: payload.originalImage,
});

export default setOriginalImage;

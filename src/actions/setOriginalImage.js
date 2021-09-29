export const SET_ORIGINAL_IMAGE = 'SET_ORIGINAL_IMAGE';

const setOriginalImage = (state, payload) => ({
  ...state,
  error: null,
  originalImage: payload.originalImage,
});

export default setOriginalImage;

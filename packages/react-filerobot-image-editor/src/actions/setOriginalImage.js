export const SET_ORIGINAL_IMAGE = 'SET_ORIGINAL_IMAGE';

const setOriginalImage = (state, payload) => ({
  ...state,
  feedback: {},
  originalImage: payload.originalImage,
  imgSrc: payload.originalImage.src,
});

export default setOriginalImage;

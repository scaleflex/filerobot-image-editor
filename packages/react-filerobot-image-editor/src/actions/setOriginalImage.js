export const SET_ORIGINAL_IMAGE = 'SET_ORIGINAL_IMAGE';

const setOriginalImage = (state, payload) => ({
  ...state,
  error: '',
  originalImage: payload.originalImage,
  resize: {
    width: state.resize.width || payload.originalImage.width,
    height: state.resize.height || payload.originalImage.height,
  },
});

export default setOriginalImage;

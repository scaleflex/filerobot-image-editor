export const TOGGLE_ORIGINAL_IMAGE_DISPLAY = 'TOGGLE_ORIGINAL_IMAGE_DISPLAY';

const toggleOriginalImageDisplay = (state, payload) => ({
  ...state,
  isShowOriginalImage: payload.isShow,
});

export default toggleOriginalImageDisplay;

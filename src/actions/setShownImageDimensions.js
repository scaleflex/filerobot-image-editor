export const SET_SHOWN_IMAGE_DIMENSIONS = 'SET_SHOWN_IMAGE_DIMENSIONS';

const setShownImageDimensions = (state, payload) => ({
  ...state,
  ...payload,
});

export default setShownImageDimensions;

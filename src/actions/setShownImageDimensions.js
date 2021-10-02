export const SET_SHOWN_IMAGE_DIMENSIONS = 'SET_SHOWN_IMAGE_DIMENSIONS';

const setShownImageDimensions = (state, payload) => ({
  ...state,
  shownImageDimensions: {
    ...state.shownImageDimensions,
    ...payload.shownImageDimensions,
  },
  designLayer: payload.designLayer || state.designLayer,
  previewGroup: payload.previewGroup || state.previewGroup,
});

export default setShownImageDimensions;

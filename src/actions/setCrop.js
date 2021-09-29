export const SET_CROP = 'SET_CROP';

const setCrop = (state, payload) => ({
  ...state,
  isDesignState: true,
  adjustments: {
    ...state.adjustments,
    crop: {
      x: payload.x,
      y: payload.y,
      ratio: payload.ratio,
      width: payload.width,
      height: payload.height,
    },
  },
});

export default setCrop;

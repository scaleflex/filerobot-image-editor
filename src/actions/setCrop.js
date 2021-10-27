export const SET_CROP = 'SET_CROP';

const setCrop = (state, payload) => {
  const oldCrop = state.adjustments.crop || {};

  return {
    ...state,
    isDesignState: true,
    adjustments: {
      ...state.adjustments,
      crop: {
        x: payload.x || oldCrop.x,
        y: payload.y || oldCrop.y,
        ratio: payload.ratio || oldCrop.ratio,
        width: payload.width || oldCrop.width,
        height: payload.height || oldCrop.height,
      },
    },
  };
};

export default setCrop;

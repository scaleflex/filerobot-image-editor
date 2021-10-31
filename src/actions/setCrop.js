export const SET_CROP = 'SET_CROP';

const setCrop = (state, payload) => {
  const oldCrop = state.adjustments.crop ?? {};

  return {
    ...state,
    isDesignState: true,
    adjustments: {
      ...state.adjustments,
      crop: {
        absoluteX: payload.absoluteX ?? oldCrop.absoluteX,
        absoluteY: payload.absoluteY ?? oldCrop.absoluteY,
        relativeX: payload.relativeX ?? oldCrop.relativeX,
        relativeY: payload.relativeY ?? oldCrop.relativeY,
        ratio: payload.ratio ?? oldCrop.ratio,
        width: payload.width ?? oldCrop.width,
        height: payload.height ?? oldCrop.height,
      },
    },
  };
};

export default setCrop;

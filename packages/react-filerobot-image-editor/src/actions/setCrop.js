import toPrecisedFloat from 'utils/toPrecisedFloat';

export const SET_CROP = 'SET_CROP';

const setCrop = (state, payload) => {
  const oldCrop = state.adjustments.crop ?? {};
  const newCrop = {
    x: toPrecisedFloat(payload.x) ?? oldCrop.x,
    y: toPrecisedFloat(payload.y) ?? oldCrop.y,
    ratio:
      typeof payload.ratio === 'string'
        ? payload.ratio
        : toPrecisedFloat(payload.ratio) ?? oldCrop.ratio,
    width: toPrecisedFloat(payload.width) ?? oldCrop.width,
    height: toPrecisedFloat(payload.height) ?? oldCrop.height,
    ratioTitleKey: payload.ratioTitleKey ?? oldCrop.ratioTitleKey,
    ratioGroupKey: payload.ratioGroupKey,
    ratioFolderKey: payload.ratioFolderKey,
  };

  if (
    oldCrop.x === newCrop.x &&
    oldCrop.y === newCrop.y &&
    (oldCrop.width === newCrop.width ||
      (newCrop.width === toPrecisedFloat(state.shownImageDimensions.width) &&
        !oldCrop.width !== null)) &&
    (oldCrop.height === newCrop.height ||
      (newCrop.height === toPrecisedFloat(state.shownImageDimensions.height) &&
        oldCrop.height !== null)) &&
    oldCrop.ratio === newCrop.ratio &&
    oldCrop.ratioTitleKey === newCrop.ratioTitleKey &&
    oldCrop.ratioGroupKey === newCrop.ratioGroupKey &&
    oldCrop.ratioFolderKey === newCrop.ratioFolderKey
  ) {
    return state;
  }

  return {
    ...state,
    isDesignState: !payload.dismissHistory,
    adjustments: {
      ...state.adjustments,
      crop: {
        ...oldCrop,
        ...newCrop,
      },
    },
  };
};

export default setCrop;

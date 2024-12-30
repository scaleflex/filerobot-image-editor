/** Internal dependencies */
import toPrecisedFloat from './toPrecisedFloat';

const getShownImageZoomPercentage = ({
  originalSource,
  resize,
  shownImageDimensions,
  zoom,
} = {}) => {
  const previewToRealImgFactor =
    originalSource && !resize.width && !resize.height
      ? shownImageDimensions.originalSourceInitialScale * zoom.factor
      : zoom.factor;
  return toPrecisedFloat(previewToRealImgFactor * 100, 0) || 100;
};

export default getShownImageZoomPercentage;

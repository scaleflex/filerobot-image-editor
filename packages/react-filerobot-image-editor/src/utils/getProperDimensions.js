/** Internal Dependencies */
import mapCropBox from './mapCropBox';

const getProperDimensiosns = (
  resizeDimensions,
  cropDimensions,
  shownImageDimensions,
  originalDimensions,
) => {
  if (resizeDimensions.width && resizeDimensions.height) {
    return resizeDimensions;
  }

  const mappedCropArea = mapCropBox(
    cropDimensions,
    shownImageDimensions,
    originalDimensions,
  );
  if (resizeDimensions.width || resizeDimensions.height) {
    return {
      width: resizeDimensions.width || mappedCropArea.width,
      height: resizeDimensions.height || mappedCropArea.height,
    };
  }

  return (
    (mappedCropArea.width && mappedCropArea.height && mappedCropArea) ||
    originalDimensions
  );
};

export default getProperDimensiosns;

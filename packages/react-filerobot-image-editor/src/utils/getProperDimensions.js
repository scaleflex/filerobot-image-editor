/** Internal Dependencies */
import getSizeAfterRotation from './getSizeAfterRotation';
import mapCropBox from './mapCropBox';

const getProperDimensions = (
  resizeDimensions,
  cropDimensions,
  shownImageDimensions,
  disableResizeAfterRotation,
  originalDimensions = { width: 0, height: 0 },
  rotationAngle = 0,
) => {
  if (resizeDimensions.width && resizeDimensions.height) {
    return resizeDimensions;
  }

  const mappedCropArea = mapCropBox(
    cropDimensions,
    shownImageDimensions,
    originalDimensions,
  );

  if (disableResizeAfterRotation) {
    return mappedCropArea.width && mappedCropArea.height
      ? mappedCropArea
      : originalDimensions;
  }

  const croppedRotatedArea = getSizeAfterRotation(
    mappedCropArea.width,
    mappedCropArea.height,
    rotationAngle,
  );
  if (resizeDimensions.width || resizeDimensions.height) {
    return {
      width: resizeDimensions.width || croppedRotatedArea.width,
      height: resizeDimensions.height || croppedRotatedArea.height,
    };
  }

  return (
    (croppedRotatedArea.width &&
      croppedRotatedArea.height &&
      croppedRotatedArea) || {
      ...originalDimensions,
      ...getSizeAfterRotation(
        originalDimensions.width,
        originalDimensions.height,
        rotationAngle,
      ),
    }
  );
};

export default getProperDimensions;

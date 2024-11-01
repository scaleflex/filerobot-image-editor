/** Internal Dependencies */
import getSizeAfterRotation from './getSizeAfterRotation';
import mapCropBox from './mapCropBox';

const getProperDimensions = ({
  resize,
  crop,
  shownImageDimensions,
  disableResizeAfterRotation,
  originalSource = { width: 0, height: 0 },
  rotation = 0,
}) => {
  if (resize.width && resize.height) {
    return resize;
  }

  const mappedCropArea = mapCropBox(crop, shownImageDimensions, originalSource);

  if (disableResizeAfterRotation) {
    return mappedCropArea.width && mappedCropArea.height
      ? mappedCropArea
      : originalSource;
  }

  const croppedRotatedArea = getSizeAfterRotation(
    mappedCropArea.width,
    mappedCropArea.height,
    rotation,
  );
  if (resize.width || resize.height) {
    return {
      width: resize.width || croppedRotatedArea.width,
      height: resize.height || croppedRotatedArea.height,
    };
  }

  return (
    (croppedRotatedArea.width &&
      croppedRotatedArea.height &&
      croppedRotatedArea) || {
      ...originalSource,
      ...getSizeAfterRotation(
        originalSource.width,
        originalSource.height,
        rotation,
      ),
    }
  );
};

export default getProperDimensions;

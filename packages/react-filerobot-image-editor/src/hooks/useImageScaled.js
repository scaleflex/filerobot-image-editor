/** Internal Dependencies */
import { TOOLS_IDS } from 'utils/constants';
import useStore from './useStore';
import useAnnotation from './useAnnotation';

const ADDED_IMG_SPACING_PERCENT = 0.15;

const useImageScaled = (
  padding = ADDED_IMG_SPACING_PERCENT,
  moreImageAnnotation = {},
) => {
  const {
    originalSource,
    shownImageDimensions,
    adjustments: { crop = {} },
  } = useStore();
  const [image, saveImage, addNewImage] = useAnnotation(
    {
      name: TOOLS_IDS.IMAGE,
      opacity: 1,
      ...moreImageAnnotation,
    },
    false,
  );

  const updateAnnotation = (loadedImg, func, newAnnotationData = {}) => {
    const layerWidth =
      crop.width / shownImageDimensions.originalSourceInitialScale ||
      originalSource.width;
    const layerHeight =
      crop.height / shownImageDimensions.originalSourceInitialScale ||
      originalSource.height;
    const layerCropX =
      crop.x / shownImageDimensions.originalSourceInitialScale || 0;
    const layerCropY =
      crop.y / shownImageDimensions.originalSourceInitialScale || 0;
    const newImgRatio = Math.min(
      1,
      layerWidth / (loadedImg.width + loadedImg.width * padding),
      layerHeight / (loadedImg.height + loadedImg.height * padding),
    );

    const newAnnotation = {
      name: TOOLS_IDS.IMAGE,
      image: loadedImg,
      x: layerCropX + layerWidth / 2 - (loadedImg.width * newImgRatio) / 2,
      y: layerCropY + layerHeight / 2 - (loadedImg.height * newImgRatio) / 2,
      width: loadedImg.width * newImgRatio,
      height: loadedImg.height * newImgRatio,
      ...newAnnotationData,
    };

    func(newAnnotation);
    return newAnnotation;
  };

  const addImgScaled = (loadedImg, newAnnotationData) => {
    updateAnnotation(loadedImg, addNewImage, newAnnotationData);
  };

  // updates the annotation image with overwriting the original image with the new one
  // if we don't add like this, the original image of the previous image will show.
  const updateImageScaled = (loadedImg, newAnnotationData) => {
    const newAnnotation = updateAnnotation(loadedImg, saveImage, {
      ...newAnnotationData,
      originalImage: loadedImg,
    });
    return newAnnotation;
  };

  return { image, saveImage, addImgScaled, updateImageScaled };
};

export default useImageScaled;

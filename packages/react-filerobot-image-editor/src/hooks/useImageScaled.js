import { TOOLS_IDS } from 'utils/constants';

import useStore from './useStore';
import useAnnotation from './useAnnotation';

const ADDED_IMG_SPACING_PERCENT = 0.15;

const useImageScaled = (
  padding = ADDED_IMG_SPACING_PERCENT,
  moreImageAnnotation = {},
) => {
  const {
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
    const layerWidth = crop.width || shownImageDimensions.width;
    const layerHeight = crop.height || shownImageDimensions.height;
    const layerCropX = crop.x || 0;
    const layerCropY = crop.y || 0;
    const newImgRatio = Math.min(
      1,
      layerWidth / (loadedImg.width + loadedImg.width * padding),
      layerHeight / (loadedImg.height + loadedImg.height * padding),
    );

    func({
      image: loadedImg,
      x: layerCropX + layerWidth / 2 - (loadedImg.width * newImgRatio) / 2,
      y: layerCropY + layerHeight / 2 - (loadedImg.height * newImgRatio) / 2,
      width: loadedImg.width * newImgRatio,
      height: loadedImg.height * newImgRatio,
      ...newAnnotationData,
    });
  };

  const addImgScaled = (loadedImg, newAnnotationData) => {
    updateAnnotation(loadedImg, addNewImage, newAnnotationData);
  };

  const updateImageScaled = (loadedImg, newAnnotationData) => {
    updateAnnotation(loadedImg, saveImage, {
      ...newAnnotationData,
      originalImage: loadedImg,
    });
  };

  return { image, saveImage, addImgScaled, updateImageScaled };
};

export default useImageScaled;

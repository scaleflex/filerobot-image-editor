/** External Dependencies */
import Konva from 'konva';

/** Internal Dependencies */
import { HIDE_LOADER, SET_SAVED } from 'actions';
import {
  ELLIPSE_CROP,
  IMAGE_NODE_ID,
  SUPPORTED_IMAGE_TYPES,
  TOOLS_IDS,
} from 'utils/constants';
import extractCurrentDesignState from 'utils/extractCurrentDesignState';
import mapCropBox from 'utils/mapCropBox';
import getSizeAfterRotation from 'utils/getSizeAfterRotation';
import imageToBase64 from 'utils/imageToBase64';
import getFileFullName from 'utils/getFileFullName';
import operationsToCloudimageUrl from 'utils/operationsToCloudimageUrl';
import useStore from './useStore';

const useTransformedImgData = () => {
  const state = useStore();
  const {
    dispatch,
    designLayer,
    shownImageDimensions,
    originalImage,
    adjustments: { crop, rotation = 0, isFlippedX, isFlippedY },
    config: {
      savingPixelRatio,
      previewPixelRatio,
      forceToPngInEllipticalCrop,
      defaultSavedImageType,
      useCloudimage,
      cloudimage,
    },
  } = state;

  const getTransformedCloudimageData = (imageFileInfo = {}) => {
    const { filter, ...designState } = extractCurrentDesignState(state);
    const cloudimageUrl = operationsToCloudimageUrl(
      cloudimage,
      designState,
      shownImageDimensions,
      originalImage,
    );
    const mappedCropBox = mapCropBox(
      {
        x: crop.x,
        y: crop.y,
        width: crop.width,
        height: crop.height,
      },
      shownImageDimensions,
      originalImage,
    );

    const imageData = {
      cloudimageUrl,
      width: imageFileInfo?.size?.width || mappedCropBox.width,
      height: imageFileInfo?.size?.height || mappedCropBox.height,
    };

    return {
      imageData,
      designState,
    };
  };

  const getTransformedImgData = (
    imageFileInfo = {},
    pixelRatio = false,
    keepLoadingSpinnerShown = false,
  ) => {
    Konva.pixelRatio = pixelRatio || savingPixelRatio;
    const { clipWidth, clipHeight, clipX, clipY } = designLayer.attrs;

    // We're using this for letting the designLayer's clipFunc know that we are in saving mode
    // so it should apply elliptical crop if it is not applied and user is chosing ellitpical ratio.
    designLayer.setAttr('isSaving', true);

    const preparedCanvas = designLayer.getStage().clone({
      width: originalImage.width,
      height: originalImage.height,
      scaleX: isFlippedX ? -1 : 1,
      scaleY: isFlippedY ? -1 : 1,
    });

    const [preparedDesignLayer] = preparedCanvas.children; // children[0] = Design layer
    preparedCanvas.children[1].destroy(); // children[1] = Transformers layer, which is not needed anymore
    const imgNode = preparedCanvas.findOne(`#${IMAGE_NODE_ID}`);
    imgNode.cache();

    const preparedDesignLayerScale = {
      x: preparedCanvas.width() / shownImageDimensions.width,
      y: preparedCanvas.height() / shownImageDimensions.height,
    };
    preparedDesignLayer.setAttrs({
      rotation: 0,
      offsetX: 0,
      offsetY: 0,
      x: 0,
      y: 0,
      scaleX: preparedDesignLayerScale.x,
      scaleY: preparedDesignLayerScale.y,
    });

    const {
      name,
      extension,
      quality = 92,
      size = {},
    } = {
      ...((!imageFileInfo.name || !imageFileInfo.extension) &&
        getFileFullName(
          originalImage.name,
          forceToPngInEllipticalCrop && crop.ratio === ELLIPSE_CROP
            ? 'png'
            : SUPPORTED_IMAGE_TYPES.includes(
                defaultSavedImageType?.toLowerCase(),
              ) && defaultSavedImageType,
        )),
      ...imageFileInfo,
    };

    const isQualityAcceptable = ['jpeg', 'jpg', 'webp'].includes(extension);

    const mappedCropBox = mapCropBox(
      {
        x: crop.x || clipX,
        y: crop.y || clipY,
        width: crop.width || clipWidth,
        height: crop.height || clipHeight,
      },
      shownImageDimensions,
      preparedCanvas.attrs,
    );
    const rotatedCropBox = getSizeAfterRotation(
      mappedCropBox.width,
      mappedCropBox.height,
      rotation,
    );
    preparedCanvas.setAttrs({
      offsetX: mappedCropBox.width / 2 + mappedCropBox.x,
      offsetY: mappedCropBox.height / 2 + mappedCropBox.y,
      width: rotatedCropBox.width,
      height: rotatedCropBox.height,
      x: rotatedCropBox.width / 2,
      y: rotatedCropBox.height / 2,
      rotation,
    });

    if (size.width) {
      const newScaleX =
        (isFlippedX ? -1 : 1) * (size.width / preparedCanvas.width());
      preparedCanvas.setAttrs({
        scaleX: newScaleX,
        width: size.width,
        x: preparedCanvas.x() * Math.abs(newScaleX),
      });
    }
    if (size.height) {
      const newScaleY =
        (isFlippedY ? -1 : 1) * (size.height / preparedCanvas.height());
      preparedCanvas.setAttrs({
        scaleY: newScaleY,
        height: size.height,
        y: preparedCanvas.y() * Math.abs(newScaleY),
      });
    }

    // As jpg doesn't support quality proeprty but it still same as jpeg,
    // then we convert mime to image/jpeg and name the file with .jpg
    const finalOptions = {
      mimeType: `image/${extension === 'jpg' ? 'jpeg' : extension}`,
      ...(isQualityAcceptable ? { quality } : {}),
    };
    const finalCanvas = preparedCanvas.toCanvas(finalOptions);
    const finalImgBase64 = preparedCanvas.toDataURL(finalOptions);
    const finalImgDesignState = {
      ...extractCurrentDesignState(state),
      shownImageDimensions: {
        width: state.shownImageDimensions.width,
        height: state.shownImageDimensions.height,
        scaledBy: state.shownImageDimensions.scaledBy,
      },
    };
    if (finalImgDesignState.filter) {
      finalImgDesignState.filter = finalImgDesignState.filter.name;
    }
    finalImgDesignState.finetunes = finalImgDesignState.finetunes.map(
      (finetuneFn) => finetuneFn.name,
    );
    Object.keys(finalImgDesignState.annotations).forEach((k) => {
      const annotation = finalImgDesignState.annotations[k];
      const imgSrc =
        annotation.name === TOOLS_IDS.IMAGE && annotation.image?.src;
      if (imgSrc && imgSrc.startsWith('blob:')) {
        finalImgDesignState.annotations[k].image = imageToBase64(
          annotation.image,
        );
      } else if (annotation.image instanceof HTMLImageElement) {
        finalImgDesignState.annotations[k].image = imgSrc;
      }
    });

    const finalImgPassedObject = {
      fullName: `${name}.${extension}`,
      name,
      extension,
      mimeType: `image/${extension}`,
      imageCanvas: finalCanvas,
      imageBase64: finalImgBase64,
      width: size.width || mappedCropBox.width,
      height: size.height || mappedCropBox.height,
      ...(isQualityAcceptable ? { quality } : {}),
    };

    // Reseting isSaving to false so we get everything back to normal if user wants to continue editing after saving.
    designLayer.setAttr('isSaving', false);
    dispatch({ type: SET_SAVED });
    imgNode.clearCache();

    Konva.pixelRatio = previewPixelRatio;

    const hideLoadingSpinner = () => {
      dispatch({ type: HIDE_LOADER });
    };
    if (!keepLoadingSpinnerShown) {
      hideLoadingSpinner();
    }

    return {
      imageData: finalImgPassedObject,
      designState: finalImgDesignState,
      hideLoadingSpinner,
    };
  };

  return useCloudimage ? getTransformedCloudimageData : getTransformedImgData;
};

export default useTransformedImgData;

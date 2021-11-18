/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useStore } from 'hooks';
import getFileFullName from 'utils/getFileFullName';
import mapCropBox from 'utils/mapCropBox';
import ButtonWithMenu from 'components/common/ButtonWithMenu';
import extractCurrentDesignState from 'utils/extractCurrentDesignState';
import {
  CLOSING_REASONS,
  ELLIPSE_CROP,
  SUPPORTED_IMAGE_TYPES,
} from 'utils/constants';
import { SET_SAVED } from 'actions';

const SaveButton = () => {
  const state = useStore();
  const {
    dispatch,
    shownImageDimensions,
    haveNotSavedChanges,
    designLayer,
    originalImage,
    resize,
    adjustments: { crop, isFlippedX, isFlippedY } = {},
    config: {
      onClose,
      closeAfterSave,
      onSave,
      onSaveAs,
      forceToPngInEllipticalCrop,
      saveButtonLabel = 'Save',
      saveAsButtonLabel = 'Save as',
      hideSaveAsMenu,
      savedImageType,
    },
  } = state;

  const handleSave = () => {
    if (typeof onSave !== 'function') {
      // eslint-disable-next-line no-console
      console.error('Please provide onSave function handler to the plugin.');
      return;
    }
    const {
      fullName: fileFullName,
      name,
      extension,
    } = getFileFullName(
      originalImage.name,
      forceToPngInEllipticalCrop && crop.ratio === ELLIPSE_CROP
        ? 'png'
        : SUPPORTED_IMAGE_TYPES.includes(savedImageType?.toLowerCase()) &&
            savedImageType,
    );
    const { clipWidth, clipHeight, clipX, clipY } = designLayer.attrs;

    // We're using this for letting the designLayer's clipFunc know that we are in saving mode
    // so it should apply elliptical crop if it is not applied and user is chosing ellitpical ratio.
    designLayer.setAttr('isSaving', true);

    const preparedCanvas = designLayer.getStage().clone({
      scaleX: isFlippedX ? -1 : 1,
      scaleY: isFlippedY ? -1 : 1,
      width: resize.width || originalImage.width,
      height: resize.height || originalImage.height,
      x: isFlippedX ? resize.width || originalImage.width : 0,
      y: isFlippedY ? resize.height || originalImage.height : 0,
    });

    const [preparedDesignLayer] = preparedCanvas.children; // children[0] = Design layer
    preparedCanvas.children[1].destroy(); // children[1] = Transformers layer, which is not needed anymore
    const mappedCropBox = mapCropBox(
      {
        x: crop.relativeX || clipX,
        y: crop.relativeY || clipY,
        width: crop.width || clipWidth,
        height: crop.height || clipHeight,
      },
      shownImageDimensions,
      preparedCanvas,
    );

    const preparedDesignLayerScale = {
      x: preparedCanvas.width() / shownImageDimensions.width,
      y: preparedCanvas.height() / shownImageDimensions.height,
    };
    preparedDesignLayer.setAttrs({
      x: 0,
      y: 0,
      scaleX: preparedDesignLayerScale.x,
      scaleY: preparedDesignLayerScale.y,
    });

    const finalImgBase64 = preparedCanvas.toDataURL({
      ...mappedCropBox,
      x: isFlippedX
        ? preparedCanvas.width() - mappedCropBox.x - mappedCropBox.width
        : mappedCropBox.x,
      y: isFlippedY
        ? preparedCanvas.height() - mappedCropBox.y - mappedCropBox.height
        : mappedCropBox.y,
      mimeType: `image/${extension}`,
      // pixelRatio: window ? window.devicePixelRatio : 1, // Do we need this?
    });

    const finalImgDesignState = extractCurrentDesignState(state);
    const finalImgPassedObject = {
      fullName: fileFullName,
      name,
      extension,
      mimeType: `image/${extension}`,
      imageBase64: finalImgBase64,
      width: mappedCropBox.width,
      height: mappedCropBox.height,
    };

    onSave(finalImgPassedObject, finalImgDesignState);

    // Reseting isSaving to false so we get everything back to normal if user wants to continue editing after saving.
    designLayer.setAttr('isSaving', false);
    dispatch({ type: SET_SAVED });

    if (closeAfterSave && onClose) {
      onClose(CLOSING_REASONS.AFTER_SAVE);
    }
  };

  const handleSaveAsClick = () => {
    if (typeof onSaveAs === 'function') {
      onSaveAs();
    }

    // TODO: Apply modal to let user choose file name and extension , then call onSave again.
    handleSave();
  };

  const menuItems = [
    {
      key: 'Save-as',
      label: saveAsButtonLabel,
      onClick: handleSaveAsClick,
      isActive: false,
    },
  ];

  return (
    <ButtonWithMenu
      label={saveButtonLabel}
      onClick={handleSave}
      menuItems={hideSaveAsMenu ? [] : menuItems}
      arrowColor="#FFFFFF"
      disabled={!haveNotSavedChanges}
    />
  );
};

export default SaveButton;

/** External Dependencies */
import React, { useEffect, useState } from 'react';
import { MenuItem } from '@scaleflex/ui/core';
import { Rename } from '@scaleflex/icons';

/** Internal Dependencies */
import { useStore } from 'hooks';
import getFileFullName from 'utils/getFileFullName';
import mapCropBox from 'utils/mapCropBox';
import ButtonWithMenu from 'components/common/ButtonWithMenu';
import extractCurrentDesignState from 'utils/extractCurrentDesignState';
import {
  CLOSING_REASONS,
  ELLIPSE_CROP,
  IMAGE_NODE_ID,
  SUPPORTED_IMAGE_TYPES,
} from 'utils/constants';
import { SET_SAVED } from 'actions';
import Modal from 'components/common/Modal';
import {
  StyledFileExtensionSelect,
  StyledFileNameInput,
} from './Topbar.styled';

const SaveButton = () => {
  const state = useStore();
  const {
    theme,
    dispatch,
    shownImageDimensions,
    haveNotSavedChanges,
    designLayer,
    originalImage,
    resize,
    t,
    adjustments: { crop, isFlippedX, isFlippedY } = {},
    config: {
      onClose,
      closeAfterSave,
      onSave,
      onSaveAs,
      forceToPngInEllipticalCrop,
      hideSaveAsMenu,
      savedImageType,
    },
  } = state;
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [imageFileInfo, setImageFileInfo] = useState({});

  const handleSave = () => {
    if (typeof onSave !== 'function') {
      // eslint-disable-next-line no-console
      console.error('Please provide onSave function handler to the plugin.');
      return;
    }

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
    const imgNode = preparedCanvas.findOne(`#${IMAGE_NODE_ID}`);
    imgNode.cache();
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

    const { name, extension } = imageFileInfo;

    const finalImgBase64 = preparedCanvas.toDataURL({
      ...mappedCropBox,
      x: isFlippedX
        ? preparedCanvas.width() - mappedCropBox.x - mappedCropBox.width
        : mappedCropBox.x,
      y: isFlippedY
        ? preparedCanvas.height() - mappedCropBox.y - mappedCropBox.height
        : mappedCropBox.y,
      mimeType: `image/${extension}`,
    });

    const finalImgDesignState = extractCurrentDesignState(state);
    const finalImgPassedObject = {
      fullName: `${name}.${extension}`,
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
    imgNode.clearCache();
    if (closeAfterSave && onClose) {
      onClose(CLOSING_REASONS.AFTER_SAVE);
    }
  };

  const cancelModal = () => {
    setIsModalOpened(false);
  };

  const changeFileName = (e) => {
    const name = e.target.value;
    setImageFileInfo({
      ...imageFileInfo,
      name,
    });
  };

  const onSaveAsClick = () => {
    if (typeof onSaveAs === 'function') {
      if (onSaveAs() === false) {
        return;
      }
    }

    setIsModalOpened(true);
  };

  const handleSaveAs = () => {
    if (!imageFileInfo.name || !imageFileInfo.extension) {
      return;
    }

    handleSave();
    setIsModalOpened(false);
  };

  useEffect(() => {
    if (originalImage && (!imageFileInfo.name || !imageFileInfo.extension)) {
      const { name, extension } = getFileFullName(
        originalImage.name,
        forceToPngInEllipticalCrop && crop.ratio === ELLIPSE_CROP
          ? 'png'
          : SUPPORTED_IMAGE_TYPES.includes(savedImageType?.toLowerCase()) &&
              savedImageType,
      );

      setImageFileInfo({ ...imageFileInfo, name, extension });
    }
  }, [originalImage, isModalOpened]);

  const menuItems = [
    {
      key: 'Save-as',
      label: t('saveAs'),
      onClick: onSaveAsClick,
      isActive: false,
    },
  ];

  return (
    <>
      <ButtonWithMenu
        label={t('save')}
        onClick={handleSave}
        menuItems={hideSaveAsMenu ? [] : menuItems}
        arrowColor="#FFFFFF"
        disabled={!haveNotSavedChanges}
      />
      {isModalOpened && (
        <Modal
          title={t('saveAsModalLabel')}
          Icon={(props) => (
            <Rename color={theme.palette['accent-primary']} {...props} />
          )}
          isOpened={isModalOpened}
          onCancel={cancelModal}
          onDone={handleSaveAs}
          doneLabel={t('save')}
          cancelLabel={t('cancel')}
          doneButtonColor="primary"
        >
          <StyledFileNameInput
            value={imageFileInfo.name}
            onChange={changeFileName}
            size="sm"
            placeholder={t('name')}
            error={Boolean(imageFileInfo.name)}
            focusOnMount
          />
          <StyledFileExtensionSelect
            onChange={(ext) =>
              setImageFileInfo({ ...imageFileInfo, extension: ext })
            }
            value={imageFileInfo.extension}
            placeholder={t('extension')}
            size="sm"
          >
            {SUPPORTED_IMAGE_TYPES.map((ext) => (
              <MenuItem key={ext} value={ext}>
                {ext}
              </MenuItem>
            ))}
          </StyledFileExtensionSelect>
        </Modal>
      )}
    </>
  );
};

export default SaveButton;

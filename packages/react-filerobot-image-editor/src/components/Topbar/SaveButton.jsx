/** External Dependencies */
import React, { useEffect, useState } from 'react';
import MenuItem from '@scaleflex/ui/core/menu-item';
import Rename from '@scaleflex/icons/rename';
import Label from '@scaleflex/ui/core/label';

/** Internal Dependencies */
import { useStore } from 'hooks';
import getFileFullName from 'utils/getFileFullName';
import mapCropBox from 'utils/mapCropBox';
import extractCurrentDesignState from 'utils/extractCurrentDesignState';
import {
  CLOSING_REASONS,
  ELLIPSE_CROP,
  IMAGE_NODE_ID,
  SUPPORTED_IMAGE_TYPES,
} from 'utils/constants';
import { SET_SAVED, SET_ERROR } from 'actions';
import Modal from 'components/common/Modal';
import Slider from 'components/common/Slider';
import restrictNumber from 'utils/restrictNumber';
import { Resize } from 'components/tools/Resize';
import operationsToCloudimageUrl from 'utils/operationsToCloudimageUrl';
import {
  StyledSaveButton,
  StyledFileExtensionSelect,
  StyledFileNameInput,
  StyledQualityWrapper,
  StyledResizeOnSave,
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
      onBeforeSave,
      onSave,
      forceToPngInEllipticalCrop,
      defaultSavedImageType,
      useCloudimage,
      cloudimage,
    },
  } = state;
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [imageFileInfo, setImageFileInfo] = useState({ quality: 0.92 });
  const isQualityAcceptable =
    imageFileInfo.extension === 'jpeg' || imageFileInfo.extension === 'webp';

  const cancelModal = () => {
    setIsModalOpened(false);
  };

  const handleSave = () => {
    if (typeof onSave !== 'function') {
      throw new Error('Please provide onSave function handler to the plugin.');
    }
    if (!imageFileInfo.name || !imageFileInfo.extension) {
      dispatch({
        type: SET_ERROR,
        payload: {
          message: t('nameIsRequired'),
        },
      });
      return;
    }

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
      x: 0,
      y: 0,
      scaleX: preparedDesignLayerScale.x,
      scaleY: preparedDesignLayerScale.y,
    });

    const { name, extension, quality, size = {} } = imageFileInfo;

    const mappedCropBox = mapCropBox(
      {
        x: crop.relativeX || clipX,
        y: crop.relativeY || clipY,
        width: crop.width || clipWidth,
        height: crop.height || clipHeight,
      },
      shownImageDimensions,
      preparedCanvas.attrs,
    );
    preparedCanvas.setAttrs({
      ...mappedCropBox,
      x: -mappedCropBox.x,
      y: -mappedCropBox.y,
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

    const finalImgBase64 = preparedCanvas.toDataURL({
      x: isFlippedX
        ? -preparedCanvas.width() - Math.abs(preparedCanvas.x() * 2)
        : 0,
      y: isFlippedY
        ? -preparedCanvas.height() - Math.abs(preparedCanvas.y() * 2)
        : 0,
      mimeType: `image/${extension}`,
      ...(isQualityAcceptable ? { quality } : {}),
    });

    const finalImgDesignState = extractCurrentDesignState(state);
    const finalImgPassedObject = {
      fullName: `${name}.${extension}`,
      name,
      extension,
      mimeType: `image/${extension}`,
      imageBase64: finalImgBase64,
      width: size.width || mappedCropBox.width,
      height: size.height || mappedCropBox.height,
      ...(isQualityAcceptable ? { quality } : {}),
    };

    onSave(finalImgPassedObject, finalImgDesignState);

    // Reseting isSaving to false so we get everything back to normal if user wants to continue editing after saving.
    designLayer.setAttr('isSaving', false);
    dispatch({ type: SET_SAVED });
    imgNode.clearCache();

    cancelModal();
    if (closeAfterSave && onClose) {
      onClose(CLOSING_REASONS.AFTER_SAVE);
    }
  };

  const changeFileName = (e) => {
    const name = e.target.value;
    setImageFileInfo({
      ...imageFileInfo,
      name,
      nameChanged: true,
    });
  };

  const changeQuality = (newQuality) => {
    setImageFileInfo({
      ...imageFileInfo,
      quality: restrictNumber(newQuality / 100, 0.01, 1),
    });
  };

  const triggerSave = () => {
    if (useCloudimage) {
      const { filter, ...designState } = extractCurrentDesignState(state);
      const cloudimageUrl = operationsToCloudimageUrl(
        cloudimage,
        designState,
        shownImageDimensions,
        originalImage,
      );
      const mappedCropBox = mapCropBox(
        {
          x: crop.relativeX,
          y: crop.relativeY,
          width: crop.width,
          height: crop.height,
        },
        shownImageDimensions,
        originalImage,
      );
      onSave(
        {
          // mimeType: `image/${extension}`,
          cloudimageUrl,
          width: resize.width || mappedCropBox.width,
          height: resize.height || mappedCropBox.height,
        },
        designState,
      );
      return;
    }

    if (
      typeof onBeforeSave === 'function' &&
      onBeforeSave(imageFileInfo) === false
    ) {
      handleSave();
      return;
    }

    setIsModalOpened(true);
  };

  const resizeImageFile = (newSize) => {
    setImageFileInfo({
      ...imageFileInfo,
      size: {
        ...imageFileInfo.size,
        ...newSize,
      },
    });
  };

  useEffect(() => {
    if (originalImage && (!imageFileInfo.name || !imageFileInfo.extension)) {
      const { name, extension } = getFileFullName(
        originalImage.name,
        forceToPngInEllipticalCrop && crop.ratio === ELLIPSE_CROP
          ? 'png'
          : SUPPORTED_IMAGE_TYPES.includes(
              defaultSavedImageType?.toLowerCase(),
            ) && defaultSavedImageType,
      );

      setImageFileInfo({ ...imageFileInfo, name, extension });
    }
  }, [originalImage, isModalOpened]);

  useEffect(() => {
    if (originalImage && resize) {
      setImageFileInfo({
        ...imageFileInfo,
        size: {
          width: resize.width,
          height: resize.height,
        },
      });
    }
  }, [resize]);

  return (
    <>
      <StyledSaveButton
        onClick={triggerSave}
        color="primary"
        size="md"
        disabled={!haveNotSavedChanges}
      >
        {t('save')}
      </StyledSaveButton>
      {isModalOpened && (
        <Modal
          title={t('saveAsModalLabel')}
          Icon={(props) => (
            <Rename color={theme.palette['accent-primary']} {...props} />
          )}
          isOpened={isModalOpened}
          onCancel={cancelModal}
          onDone={handleSave}
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
          {isQualityAcceptable && (
            <StyledQualityWrapper>
              <Label>{t('quality')}</Label>
              <Slider
                annotation="%"
                start={1}
                end={100}
                onChange={changeQuality}
                value={parseInt(imageFileInfo.quality * 100, 10)}
                hideOverlay
              />
            </StyledQualityWrapper>
          )}
          <StyledResizeOnSave>
            <Label>{t('resize')}</Label>
            <Resize
              onChange={resizeImageFile}
              currentSize={imageFileInfo?.size || {}}
              hideResetButton
              alignLeft
            />
          </StyledResizeOnSave>
        </Modal>
      )}
    </>
  );
};

export default SaveButton;

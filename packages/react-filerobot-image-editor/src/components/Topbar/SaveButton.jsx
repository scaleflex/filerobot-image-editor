/** External Dependencies */
import React, { useEffect, useRef, useState } from 'react';
import MenuItem from '@scaleflex/ui/core/menu-item';
import { Image2 } from '@scaleflex/icons';
import Label from '@scaleflex/ui/core/label';

/** Internal Dependencies */
import { useStore, useTransformedImgData } from 'hooks';
import getFileFullName from 'utils/getFileFullName';
import getDefaultSaveQuality from 'utils/getDefaultSaveQuality';
import {
  CLOSING_REASONS,
  ELLIPSE_CROP,
  SUPPORTED_IMAGE_TYPES,
  DEFAULT_SAVE_QUALITY,
} from 'utils/constants';
import { HIDE_LOADER, SET_FEEDBACK, SHOW_LOADER } from 'actions';
import Modal from 'components/common/Modal';
import Slider from 'components/common/Slider';
import restrictNumber from 'utils/restrictNumber';
import { Resize } from 'components/tools/Resize';
import ButtonWithMenu from 'components/common/ButtonWithMenu';
import {
  StyledFileExtensionSelect,
  StyledFileNameInput,
  StyledQualityWrapper,
  StyledResizeOnSave,
  StyledResizeOnSaveLabel,
} from './Topbar.styled';

const sliderStyle = { marginBottom: 16 };
const saveButtonWrapperStyle = { minWidth: 67, width: 'fit-content' }; // 67px same width as tabs bar
const saveButtonMenuStyle = { marginLeft: 12 };

let isFieSaveMounted = true;

const SaveButton = () => {
  const state = useStore();
  const optionSaveFnRef = useRef();
  const {
    theme,
    dispatch,
    originalImage,
    resize,
    isLoadingGlobally,
    haveNotSavedChanges,
    feedback,
    hasUndo,
    t,
    adjustments: { crop } = {},
    config: {
      onClose,
      closeAfterSave,
      onBeforeSave,
      onSave,
      forceToPngInEllipticalCrop,
      defaultSavedImageName,
      defaultSavedImageType,
      defaultSavedImageQuality = DEFAULT_SAVE_QUALITY,
      useCloudimage,
      moreSaveOptions,
      disableSaveIfNoChanges,
      removeSaveButton,
    },
  } = state;
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [imageFileInfo, setImageFileInfo] = useState({
    quality: getDefaultSaveQuality(defaultSavedImageQuality),
  });
  const transformImgFn = useTransformedImgData();
  const isQualityAcceptable = ['jpeg', 'jpg', 'webp'].includes(
    imageFileInfo.extension,
  );
  const isBlockerError = feedback.duration === 0;

  const cancelModal = () => {
    if (isFieSaveMounted && isModalOpened) {
      optionSaveFnRef.current = null;
      setIsModalOpened(false);
    }
  };

  const handleSave = () => {
    const transformedData = transformImgFn(imageFileInfo, false, true);
    const onSaveFn = optionSaveFnRef.current || onSave;
    const savingResult = onSaveFn(
      transformedData.imageData,
      transformedData.designState,
    );

    const hideLoadingSpinner = () => {
      dispatch({ type: HIDE_LOADER });
    };
    if (savingResult instanceof Promise) {
      savingResult.finally(hideLoadingSpinner);
    } else {
      hideLoadingSpinner();
    }

    optionSaveFnRef.current = null;
    if (closeAfterSave && onClose) {
      onClose(CLOSING_REASONS.AFTER_SAVE, haveNotSavedChanges);
    }
  };

  const startSaving = () => {
    dispatch({ type: SHOW_LOADER });
    setIsModalOpened(false);
    setTimeout(handleSave, 3);
  };

  const validateInfoThenSave = () => {
    const onSaveFn = optionSaveFnRef.current || onSave;
    if (typeof onSaveFn !== 'function') {
      throw new Error('Please provide onSave function handler.');
    }
    if (!imageFileInfo.name || !imageFileInfo.extension) {
      dispatch({
        type: SET_FEEDBACK,
        payload: {
          feedback: {
            message: t('nameIsRequired'),
          },
        },
      });
      return;
    }

    startSaving();
  };

  const changeFileName = (e) => {
    const name = e.target.value;
    setImageFileInfo({
      ...imageFileInfo,
      name,
    });
  };

  const changeQuality = (newQuality) => {
    setImageFileInfo({
      ...imageFileInfo,
      quality: restrictNumber(newQuality / 100, 0.01, 1),
    });
  };

  const triggerSaveHandler = () => {
    if (disableSaveIfNoChanges && !hasUndo) {
      return;
    }

    if (useCloudimage) {
      const transformedCloudimageData = transformImgFn(imageFileInfo);
      const onSaveFn = optionSaveFnRef.current || onSave;
      onSaveFn(
        transformedCloudimageData.imageData,
        transformedCloudimageData.designState,
      );
      return;
    }

    if (
      !optionSaveFnRef.current &&
      typeof onBeforeSave === 'function' &&
      onBeforeSave(imageFileInfo) === false
    ) {
      validateInfoThenSave();
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

  const changeSaveFnAndTriggerAnother = (saveFn, fnToTrigger) => {
    if (typeof saveFn === 'function') {
      optionSaveFnRef.current = saveFn;
      fnToTrigger();
    } else {
      throw new Error(
        'onSave function callback is required as an argument to the passed function.',
      );
    }
  };

  const setFileNameAndExtension = () => {
    const { name, extension } = getFileFullName(
      defaultSavedImageName || originalImage.name,
      forceToPngInEllipticalCrop && crop.ratio === ELLIPSE_CROP
        ? 'png'
        : SUPPORTED_IMAGE_TYPES.includes(
            defaultSavedImageType?.toLowerCase(),
          ) && defaultSavedImageType,
    );

    setImageFileInfo({ ...imageFileInfo, name, extension });
  };

  useEffect(() => {
    if (originalImage) {
      setFileNameAndExtension();
    }
  }, [originalImage]);

  useEffect(() => {
    if (originalImage && (!imageFileInfo.name || !imageFileInfo.extension)) {
      setFileNameAndExtension();
    }
  }, [isModalOpened]);

  useEffect(() => {
    setImageFileInfo({
      ...imageFileInfo,
      size: {
        width: resize.width,
        height: resize.height,
      },
    });
  }, [resize]);

  useEffect(() => {
    isFieSaveMounted = true;

    return () => {
      isFieSaveMounted = false;
    };
  }, []);

  if (removeSaveButton) {
    return null;
  }

  const menuItems =
    Array.isArray(moreSaveOptions) && moreSaveOptions.length > 0
      ? moreSaveOptions.map((option, i) => ({
          ...option,
          key: `${option.label || i}-option-key`,
          onClick:
            typeof option.onClick === 'function'
              ? () =>
                  option.onClick(
                    (saveCallback) =>
                      changeSaveFnAndTriggerAnother(
                        saveCallback,
                        triggerSaveHandler,
                      ),
                    (saveCallback) =>
                      changeSaveFnAndTriggerAnother(saveCallback, startSaving),
                  )
              : undefined,
        }))
      : [];

  return (
    <>
      <ButtonWithMenu
        className="FIE_topbar-save"
        color="primary"
        onClick={triggerSaveHandler}
        menuPosition="bottom"
        menuFromBtn
        label={menuItems.length > 0 ? t('saveAs') : t('save')}
        menuItems={menuItems}
        menuStyle={saveButtonMenuStyle}
        wrapperStyle={saveButtonWrapperStyle}
        disabled={
          isLoadingGlobally ||
          (disableSaveIfNoChanges && !hasUndo) ||
          isBlockerError
        }
        noMargin
      />
      {isModalOpened && (
        <Modal
          className="FIE_save-modal"
          title={t('saveAsModalTitle')}
          // eslint-disable-next-line react/no-unstable-nested-components
          Icon={(props) => (
            <Image2 color={theme.palette['accent-primary']} {...props} />
          )}
          isOpened={isModalOpened}
          onCancel={cancelModal}
          onDone={validateInfoThenSave}
          doneLabel={t('save')}
          cancelLabel={t('cancel')}
          doneButtonColor="primary"
          areButtonsDisabled={isLoadingGlobally}
          zIndex={11110}
        >
          <StyledFileNameInput
            className="FIE_save-file-name-input"
            value={imageFileInfo.name}
            onChange={changeFileName}
            size="sm"
            label={t('name')}
            placeholder={t('imageName')}
            error={!imageFileInfo.name}
            fullWidth
            focusOnMount
          />
          <StyledFileExtensionSelect
            className="FIE_save-extension-selector"
            onChange={(ext) =>
              setImageFileInfo({ ...imageFileInfo, extension: ext })
            }
            value={imageFileInfo.extension}
            label={t('format')}
            placeholder={t('extension')}
            size="sm"
            fullWidth
          >
            {SUPPORTED_IMAGE_TYPES.map((ext) => (
              <MenuItem key={ext} value={ext}>
                {ext}
              </MenuItem>
            ))}
          </StyledFileExtensionSelect>
          {isQualityAcceptable && (
            <StyledQualityWrapper className="FIE_save-quality-wrapper">
              <Label>{t('quality')}</Label>
              <Slider
                annotation="%"
                min={1}
                max={100}
                onChange={changeQuality}
                value={parseInt(imageFileInfo.quality * 100, 10)}
                width="100%"
                style={sliderStyle}
              />
            </StyledQualityWrapper>
          )}
          <StyledResizeOnSave className="FIE_save-resize-wrapper">
            <StyledResizeOnSaveLabel>{t('resize')}</StyledResizeOnSaveLabel>
            <Resize
              onChange={resizeImageFile}
              currentSize={imageFileInfo?.size || {}}
              hideResetButton
              alignLeft
              alignment="space-between"
            />
          </StyledResizeOnSave>
        </Modal>
      )}
    </>
  );
};

export default SaveButton;

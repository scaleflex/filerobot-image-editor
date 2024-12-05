/* eslint-disable react/no-unstable-nested-components */
/** External Dependencies */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Image2, Video2 } from '@scaleflex/icons';

/** Internal Dependencies */
import { useStore, useTransformedImgData } from 'hooks';
import getFileFullName from 'utils/getFileFullName';
import getDefaultSaveQuality from 'utils/getDefaultSaveQuality';
import {
  CLOSING_REASONS,
  ELLIPSE_CROP,
  SUPPORTED_IMAGE_TYPES,
  DEFAULT_SAVE_QUALITY,
  SUPPORTED_VIDEO_TYPES,
} from 'utils/constants';
import { SET_FEEDBACK, SET_SAVING } from 'actions';
import restrictNumber from 'utils/restrictNumber';
import ButtonWithMenu from 'components/common/ButtonWithMenu';
import isImage from 'utils/isImage';
import getSupportedExtensions from 'utils/getSupportedExtensions';
import ExportModal from 'components/common/ExportModal';
import useProcessedVideoData from 'hooks/useProcessedVideoData';
import SaveModal from './SaveModal';

const saveButtonWrapperStyle = { minWidth: 67, width: 'fit-content' }; // 67px same width as tabs bar
const saveButtonMenuStyle = { marginLeft: 12 };

let isFieSaveMounted = true;

const SaveButton = ({
  onSave,
  defaultName,
  saveLabel,
  modalProps = {},
  ...props
}) => {
  const state = useStore();
  const {
    dispatch,
    originalSource,
    resize,
    isLoadingGlobally,
    haveNotSavedChanges,
    feedback,
    hasUndo,
    t,
    sourceType,
    theme,
    adjustments: { crop } = {},
    config: {
      onClose,
      closeAfterSave,
      onBeforeSave,
      onSave: configOnSave,
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
  const [isExportModalOpened, setIsExportModalOpened] = useState(false);
  const [exportError, setExportError] = useState(null);
  const [mediaFileInfo, setMediaFileInfo] = useState({
    quality: getDefaultSaveQuality(defaultSavedImageQuality),
  });
  const [progress, setProgress] = useState(0);
  const transformImgFn = useTransformedImgData();
  const {
    processVideo: transformVideoFn,
    processVideoByBackend,
    checkVideoStatus,
    getFinalVideoData,
    abortVideoProcessing,
  } = useProcessedVideoData();

  const optionSaveFnRef = useRef();
  const isExternalSaveCb = useRef(false);

  const isBlockerError = feedback.duration === 0;
  const isImageFile = isImage(sourceType);

  const cancelModal = () => {
    if (isFieSaveMounted && isModalOpened) {
      optionSaveFnRef.current = null;
      setIsModalOpened(false);
    }
  };

  const finalizeSaving = () => {
    dispatch({
      type: SET_SAVING,
      payload: { isSaving: false, isLoadingGlobally: false },
    });
  };
  const afterTransform = (transformedData) => {
    const onSaveFn = optionSaveFnRef.current || onSave || configOnSave;

    const savingResult = onSaveFn(
      transformedData.data,
      transformedData.designState,
    );

    finalizeSaving();
    if (savingResult instanceof Promise) {
      savingResult.finally(finalizeSaving);
    } else {
      finalizeSaving();
    }

    optionSaveFnRef.current = null;
    if (closeAfterSave && onClose) {
      onClose(CLOSING_REASONS.AFTER_SAVE, haveNotSavedChanges);
    }
  };

  const setError = (newError) => {
    setExportError(newError.message || newError);
    dispatch({
      type: SET_FEEDBACK,
      payload: {
        feedback: {
          message: newError.message || newError,
        },
      },
    });
  };

  const onProgress = (newProgress) => {
    setProgress(newProgress);
  };

  const handleSave = () => {
    if (isExternalSaveCb.current) {
      const onSaveFn = optionSaveFnRef.current || onSave || configOnSave;

      onSaveFn({
        mediaFile: mediaFileInfo,
        processVideo: processVideoByBackend,
        checkVideoStatus,
        getFinalVideoData,
      });
      isExternalSaveCb.current = false;
      return;
    }

    const transformedData = isImageFile
      ? transformImgFn(mediaFileInfo, false, true)
      : transformVideoFn(mediaFileInfo, onProgress);

    if (transformedData instanceof Promise) {
      transformedData.then(afterTransform).catch((error) => {
        if (error.name !== 'AbortError') {
          setError(error);
          finalizeSaving();
        }
      });
    } else {
      afterTransform(transformedData);
    }
  };

  const startSaving = () => {
    dispatch({
      type: SET_SAVING,
      payload: { isSaving: true, isLoadingGlobally: isImageFile },
    });

    if (!isImageFile && !isExternalSaveCb.current) {
      setIsExportModalOpened(true);
    }

    setIsModalOpened(false);

    setTimeout(handleSave, 3);
  };

  const validateInfoThenSave = () => {
    const onSaveFn = optionSaveFnRef.current || onSave || configOnSave;
    if (typeof onSaveFn !== 'function') {
      console.error('Please provide onSave function handler.');
      return;
    }

    if (!mediaFileInfo.name || !mediaFileInfo.extension) {
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

  const triggerSaveHandler = () => {
    if (disableSaveIfNoChanges && !hasUndo) {
      return;
    }

    if (useCloudimage) {
      const transformedCloudimageData = transformImgFn(mediaFileInfo);
      const onSaveFn = optionSaveFnRef.current || onSave || configOnSave;
      onSaveFn(
        transformedCloudimageData.imageData,
        transformedCloudimageData.designState,
      );
      return;
    }

    if (
      !optionSaveFnRef.current &&
      typeof onBeforeSave === 'function' &&
      onBeforeSave(mediaFileInfo) === false
    ) {
      validateInfoThenSave();
      return;
    }

    setIsModalOpened(true);
  };

  const changeSaveFnAndTriggerAnother = (
    saveFn,
    fnToTrigger,
    isExternalSaveCallback,
  ) => {
    if (typeof saveFn === 'function') {
      optionSaveFnRef.current = saveFn;
      isExternalSaveCb.current = isExternalSaveCallback;
      fnToTrigger();
    } else {
      console.error(
        'onSave function callback is required as an argument to the passed function.',
      );
    }
  };

  const setFileNameAndExtension = () => {
    const { supportedTypes } = getSupportedExtensions(sourceType);
    const { name, extension } = getFileFullName(
      defaultSavedImageName || originalSource.name || defaultName,
      forceToPngInEllipticalCrop && crop.ratio === ELLIPSE_CROP
        ? 'png'
        : supportedTypes.includes(defaultSavedImageType?.toLowerCase()) &&
            defaultSavedImageType,
      sourceType,
    );

    setMediaFileInfo({ ...mediaFileInfo, name, extension });
  };

  const changeFileName = (e) => {
    const name = e.target.value;
    setMediaFileInfo({
      ...mediaFileInfo,
      name,
    });
  };

  const changeQuality = (newQuality) => {
    setMediaFileInfo({
      ...mediaFileInfo,
      quality: restrictNumber(newQuality / 100, 0.01, 1),
    });
  };

  const resizeMediaFile = (newSize) => {
    setMediaFileInfo({
      ...mediaFileInfo,
      size: {
        ...mediaFileInfo.size,
        ...newSize,
      },
    });
  };

  const selectFileExtension = (extension) => {
    setMediaFileInfo({ ...mediaFileInfo, extension });
  };

  const closeExportModal = () => {
    setIsExportModalOpened(false);
    setProgress(0);
    setExportError(null);
    abortVideoProcessing();
  };

  useEffect(() => {
    if (originalSource) {
      setFileNameAndExtension();
    }
  }, [originalSource]);

  useEffect(() => {
    if (originalSource && (!mediaFileInfo.name || !mediaFileInfo.extension)) {
      setFileNameAndExtension();
    }
  }, [isModalOpened]);

  useEffect(() => {
    setMediaFileInfo({
      ...mediaFileInfo,
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
          onSaveVideoCb:
            typeof option.onSaveVideoCb === 'function'
              ? () =>
                  option.onSaveVideoCb(
                    (saveCallback) =>
                      changeSaveFnAndTriggerAnother(
                        saveCallback,
                        triggerSaveHandler,
                        true,
                      ),
                    (saveCallback) =>
                      changeSaveFnAndTriggerAnother(
                        saveCallback,
                        startSaving,
                        true,
                      ),
                  )
              : undefined,
        }))
      : [];

  const isQualityAcceptable = ['jpeg', 'jpg', 'webp'].includes(
    mediaFileInfo.extension,
  );

  const commonModalProps = {
    modalProps,
    open: isModalOpened,
    fileInfo: mediaFileInfo,
    onCancel: cancelModal,
    onFileNameChange: changeFileName,
    onSelectFileExtension: selectFileExtension,
    onQualityChange: changeQuality,
    onResize: resizeMediaFile,
    onDone: validateInfoThenSave,
  };

  return (
    <>
      <ButtonWithMenu
        className="FIE_buttons-save-btn"
        color="primary"
        onClick={triggerSaveHandler}
        menuPosition="bottom"
        menuFromBtn
        label={saveLabel || t('save')}
        menuItems={menuItems}
        menuStyle={saveButtonMenuStyle}
        wrapperStyle={saveButtonWrapperStyle}
        disabled={
          isLoadingGlobally ||
          (disableSaveIfNoChanges && !hasUndo) ||
          isBlockerError
        }
        noMargin
        {...props}
      />
      {isModalOpened &&
        (isImageFile ? (
          <SaveModal
            icon={(iconProps) => (
              <Image2 color={theme.palette['accent-primary']} {...iconProps} />
            )}
            isQualityAcceptable={isQualityAcceptable}
            supportedTypes={SUPPORTED_IMAGE_TYPES}
            {...commonModalProps}
          />
        ) : (
          <SaveModal
            icon={(iconProps) => (
              <Video2 color={theme.palette['accent-primary']} {...iconProps} />
            )}
            supportedTypes={SUPPORTED_VIDEO_TYPES}
            {...commonModalProps}
          />
        ))}

      {isExportModalOpened && !isImageFile && (
        <ExportModal
          open={isExportModalOpened}
          progress={progress}
          onCancel={closeExportModal}
          error={exportError}
        />
      )}
    </>
  );
};

SaveButton.propTypes = {
  onSave: PropTypes.func,
  modalProps: PropTypes.instanceOf(Object),
  defaultName: PropTypes.string,
  saveLabel: PropTypes.string,
};

export default SaveButton;

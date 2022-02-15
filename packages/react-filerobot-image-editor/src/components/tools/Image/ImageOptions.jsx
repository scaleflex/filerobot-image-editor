/** External Dependencies */
import React, { useRef, useState } from 'react';
import Button from '@scaleflex/ui/core/button';

/** Internal Dependencies */
import { useAnnotation, useStore } from 'hooks';
import { FEEDBACK_STATUSES, TOOLS_IDS } from 'utils/constants';
import { SET_FEEDBACK } from 'actions';
import HiddenUploadInput from 'components/common/HiddenUploadInput';
import ImageControls from './ImageControls';

const ADDED_IMG_SPACING_PERCENT = 0.15;

const ImageOptions = () => {
  const [isLoading, setIsLoading] = useState();
  const uploadImgsInput = useRef();
  const { shownImageDimensions, dispatch, t } = useStore();
  const [image, saveImage, addNewImage] = useAnnotation(
    {
      name: TOOLS_IDS.IMAGE,
      opacity: 1,
    },
    false,
  );

  const requestedImgsCount = useRef(0);

  const addImgScaled = (loadedImg) => {
    const newImgRatio = Math.min(
      1,
      shownImageDimensions.width /
        (loadedImg.width + loadedImg.width * ADDED_IMG_SPACING_PERCENT),
      shownImageDimensions.height /
        (loadedImg.height + loadedImg.height * ADDED_IMG_SPACING_PERCENT),
    );

    addNewImage({
      image: loadedImg,
      x: shownImageDimensions.width / 2 - (loadedImg.width * newImgRatio) / 2,
      y: shownImageDimensions.height / 2 - (loadedImg.height * newImgRatio) / 2,
      width: loadedImg.width * newImgRatio,
      height: loadedImg.height * newImgRatio,
    });
  };

  const hideLoaderAfterDone = (filesLength) => {
    requestedImgsCount.current += 1;
    if (requestedImgsCount.current === filesLength) {
      requestedImgsCount.current = 0;
      setIsLoading(false);
    }
  };

  const setFeedback = (msg) => {
    dispatch({
      type: SET_FEEDBACK,
      payload: {
        feedback: {
          message: msg,
          status: FEEDBACK_STATUSES.WARNING,
        },
      },
    });
  };

  const importImages = (e) => {
    if (e.target.files) {
      setIsLoading(true);

      const wrongFilesNames = [];

      const filesArray = Array.from(e.target.files);
      const filesLength = filesArray.length;
      filesArray.forEach((file) => {
        if (file.type.startsWith('image/')) {
          const img = new Image();
          img.onload = () => {
            addImgScaled(img);
            URL.revokeObjectURL(file);
            hideLoaderAfterDone(filesLength);
          };
          img.onerror = () => {
            setFeedback(t('uploadImageError'));
            hideLoaderAfterDone(filesLength);
          };
          img.src = URL.createObjectURL(file);
        } else {
          wrongFilesNames.push(file.name);
          hideLoaderAfterDone(filesLength);
        }
      });

      if (wrongFilesNames.length > 0) {
        const errorLabel =
          wrongFilesNames.length > 1 ? t('areNotImages') : t('isNotImage');
        setFeedback(
          `${wrongFilesNames.join(', ')} ${errorLabel} ${t('toBeUploaded')}.`,
        );
      }
    }

    e.target.value = '';
  };

  const triggerUploadInput = () => {
    if (uploadImgsInput.current) {
      uploadImgsInput.current.click();
    }
  };

  return (
    <ImageControls image={image} saveImage={saveImage} t={t}>
      <Button
        className="FIE_image-tool-add-option"
        color="secondary"
        onClick={isLoading ? undefined : triggerUploadInput}
        disabled={isLoading}
        size="sm"
        style={{ maxHeight: 24 }}
      >
        {isLoading ? t('importing') : t('addImage')}
      </Button>
      <HiddenUploadInput
        ref={uploadImgsInput}
        onChange={isLoading ? undefined : importImages}
        disabled={isLoading}
        multiple
      />
    </ImageControls>
  );
};

export default ImageOptions;

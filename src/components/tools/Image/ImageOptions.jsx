/** External Dependencies */
import React, { useContext, useRef, useState } from 'react';
import { Button } from '@scaleflex/ui/core';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { TOOLS_IDS } from 'utils/constants';
import AppContext from 'context';
import { SET_ERROR } from 'actions';
import HiddenUploadInput from 'components/common/HiddenUploadInput';
import ImageControls from './ImageControls';

const ADDED_IMG_SPACING_PERCENT = 0.15;

const ImageOptions = () => {
  const [isLoading, setIsLoading] = useState();
  const uploadImgsInput = useRef();
  const { shownImageDimensions, dispatch } = useContext(AppContext);
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

  const setError = (error) => {
    dispatch({
      type: SET_ERROR,
      payload: { error },
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
            setError('Error while uploading the image.');
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
          wrongFilesNames.length > 1 ? "aren't images" : "isn't an image";
        setError(`${wrongFilesNames.join(', ')} ${errorLabel} to be uploaded.`);
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
    <ImageControls image={image} saveImage={saveImage}>
      <Button
        color="secondary"
        onClick={isLoading ? undefined : triggerUploadInput}
        disabled={isLoading}
      >
        {isLoading ? 'Importing...' : '+ Add image'}
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

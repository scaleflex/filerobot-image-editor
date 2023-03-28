/** External Dependencies */
import React, { useMemo, useRef, useState } from 'react';
import { Images, UploadOutline } from '@scaleflex/icons';

/** Internal Dependencies */
import { useAnnotation, useStore } from 'hooks';
import { FEEDBACK_STATUSES, TOOLS_IDS } from 'utils/constants';
import { SET_FEEDBACK } from 'actions';
import HiddenUploadInput from 'components/common/HiddenUploadInput';
import ButtonWithMenu from 'components/common/ButtonWithMenu';
import ImageControls from './ImageControls';
import ImagesGallery from './ImagesGallery';

const ADDED_IMG_SPACING_PERCENT = 0.15;

const ImageOptions = () => {
  const [isLoading, setIsLoading] = useState();
  const [galleryAnchorEl, setGalleryAnchorEl] = useState(null);
  const uploadImgsInput = useRef();
  const menuItemsBtnRef = useRef();
  const {
    shownImageDimensions,
    dispatch,
    adjustments: { crop = {} },
    t,
    config = {},
  } = useStore();
  const imageConfig = config[TOOLS_IDS.IMAGE];
  const isUploadEnabled = !imageConfig.disableUpload;
  const isGalleryEnabled =
    Array.isArray(imageConfig.gallery) && imageConfig.gallery.length > 0;
  const [image, saveImage, addNewImage] = useAnnotation(
    {
      name: TOOLS_IDS.IMAGE,
      opacity: 1,
    },
    false,
  );

  const requestedImgsCount = useRef(0);

  const addImgScaled = (loadedImg) => {
    const layerWidth = crop.width || shownImageDimensions.width;
    const layerHeight = crop.height || shownImageDimensions.height;
    const layerCropX = crop.x || 0;
    const layerCropY = crop.y || 0;

    const newImgRatio = Math.min(
      1,
      layerWidth /
        (loadedImg.width + loadedImg.width * ADDED_IMG_SPACING_PERCENT),
      layerHeight /
        (loadedImg.height + loadedImg.height * ADDED_IMG_SPACING_PERCENT),
    );

    addNewImage({
      image: loadedImg,
      x: layerCropX + layerWidth / 2 - (loadedImg.width * newImgRatio) / 2,
      y: layerCropY + layerHeight / 2 - (loadedImg.height * newImgRatio) / 2,
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

  const importImgFromGallery = (imgUrl) => {
    setIsLoading(true);
    const img = new Image();
    img.onload = () => {
      addImgScaled(img);
      hideLoaderAfterDone(1);
    };
    img.onerror = () => {
      setFeedback(t('uploadImageError'));
      hideLoaderAfterDone(1);
    };
    img.crossOrigin = 'Anonymous';
    img.src = imgUrl;
  };

  const openGalleryPanel = () => {
    setGalleryAnchorEl(menuItemsBtnRef.current);
  };

  const closeGalleryPanel = () => {
    setGalleryAnchorEl(null);
  };

  const menuItems = useMemo(
    () => [
      isUploadEnabled && {
        key: 'add-by-upload-image',
        label: isLoading ? t('importing') : t('uploadImage'),
        icon: UploadOutline,
        onClick: isLoading ? undefined : triggerUploadInput,
      },
      isGalleryEnabled && {
        key: 'add-from-gallery',
        label: t('fromGallery'),
        icon: Images,
        onClick: openGalleryPanel,
      },
    ],
    [imageConfig, isLoading, t],
  );

  return (
    <ImageControls image={image} saveImage={saveImage} t={t}>
      <ButtonWithMenu
        className="FIE_image-tool-add-option"
        color="secondary"
        label={t('addImage')}
        title={t('addImageTitle')}
        menuPosition="top"
        menuItems={menuItems}
        size="sm"
        style={{ maxHeight: 24 }}
        buttonRef={menuItemsBtnRef}
        menuFromBtn
      />
      {isUploadEnabled && (
        <HiddenUploadInput
          ref={uploadImgsInput}
          onChange={isLoading ? undefined : importImages}
          disabled={isLoading}
          multiple
        />
      )}
      {isGalleryEnabled && (
        <ImagesGallery
          gallery={imageConfig.gallery}
          onSelect={importImgFromGallery}
          onClose={closeGalleryPanel}
          anchorEl={galleryAnchorEl}
        />
      )}
    </ImageControls>
  );
};

export default ImageOptions;

/** External Dependencies */
import React, { useCallback } from 'react';
import Label from '@scaleflex/ui/core/label';
import Compare from '@scaleflex/icons/compare';

/** Internal Dependencies */
import { TOGGLE_ORIGINAL_IMAGE_DISPLAY } from 'actions';
import { useStore } from 'hooks';
import { StyledSmallButton } from './Topbar.styled';
import mapCropBox from '../../utils/mapCropBox';

const ImageDimensionsAndDisplayToggle = () => {
  const {
    dispatch,
    isResetted = true,
    originalImage,
    resize = {},
    adjustments: { crop },
    shownImageDimensions,
    t,
  } = useStore();

  const hideOriginalImage = () => {
    dispatch({
      type: TOGGLE_ORIGINAL_IMAGE_DISPLAY,
      payload: {
        isShow: false,
      },
    });

    document.removeEventListener('mouseup', hideOriginalImage);
    document.removeEventListener('mouseleave', hideOriginalImage);
    document.removeEventListener('touchcancel', hideOriginalImage);
    document.removeEventListener('touchend', hideOriginalImage);
  };

  const getCurrentCropDimensions = useCallback(
    () =>
      originalImage
        ? mapCropBox(crop, shownImageDimensions, originalImage)
        : {},
    [crop],
  );

  const showOriginalImage = () => {
    dispatch({
      type: TOGGLE_ORIGINAL_IMAGE_DISPLAY,
      payload: {
        isShow: true,
      },
    });

    document.addEventListener('mouseup', hideOriginalImage);
    document.addEventListener('mouseleave', hideOriginalImage);
    document.addEventListener('touchcancel', hideOriginalImage);
    document.addEventListener('touchend', hideOriginalImage);
  };

  if (!originalImage) {
    return null;
  }

  const cropDimensions = getCurrentCropDimensions();
  return (
    <>
      <Label title="Saved image size">
        {`${resize.width || cropDimensions.width || originalImage.width} x ${
          resize.height || cropDimensions.height || originalImage.height
        } px`}
      </Label>
      <StyledSmallButton
        color="link"
        horizontalMargin="8px"
        onMouseDown={isResetted ? undefined : showOriginalImage}
        onTouchStart={isResetted ? undefined : showOriginalImage}
        disabled={isResetted}
        title={t('showImageTitle')}
      >
        <Compare />
      </StyledSmallButton>
    </>
  );
};

export default ImageDimensionsAndDisplayToggle;

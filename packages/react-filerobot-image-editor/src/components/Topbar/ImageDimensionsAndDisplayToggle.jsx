/** External Dependencies */
import React from 'react';
import Compare from '@scaleflex/icons/compare';

/** Internal Dependencies */
import { TOGGLE_ORIGINAL_IMAGE_DISPLAY } from 'actions';
import { useStore } from 'hooks';
import getProperDimensions from 'utils/getProperDimensions';
import { StyledSmallButton, StyledDimensionsLabel } from './Topbar.styled';

const ImageDimensionsAndDisplayToggle = () => {
  const {
    dispatch,
    isResetted = true,
    originalImage,
    resize = {},
    adjustments: { crop, rotation = 0 },
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

  const dimensions = getProperDimensions(
    resize,
    crop,
    shownImageDimensions,
    originalImage,
    rotation,
  );

  return (
    <>
      <StyledDimensionsLabel title={t('imageDimensionsHoverTitle')}>
        {`${dimensions.width} x ${dimensions.height} px`}
      </StyledDimensionsLabel>
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

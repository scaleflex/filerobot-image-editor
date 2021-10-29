/** External Dependencies */
import React, { useContext } from 'react';
import { Label } from '@scaleflex/ui/core';

/** Internal Dependencies */
import AppContext from 'context';
import { TOGGLE_ORIGINAL_IMAGE_DISPLAY } from 'actions';
import { Union } from 'components/common/icons';
import { StyledSmallButton } from './Topbar.styled';

const ImageDimensionsAndDisplayToggle = () => {
  const {
    dispatch,
    isResetted = true,
    originalImage,
    resize = {},
  } = useContext(AppContext);

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

  return (
    <>
      <Label title="Saved image size">
        {`${resize.width || originalImage.width} x ${
          resize.height || originalImage.height
        } px`}
      </Label>
      <StyledSmallButton
        color="link"
        horizontalMargin="8px"
        onMouseDown={isResetted ? undefined : showOriginalImage}
        onTouchStart={isResetted ? undefined : showOriginalImage}
        disabled={isResetted}
        title="Show original image"
      >
        <Union />
      </StyledSmallButton>
    </>
  );
};

export default ImageDimensionsAndDisplayToggle;

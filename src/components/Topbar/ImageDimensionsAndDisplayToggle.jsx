/** External Dependencies */
import React, { useCallback, useContext } from 'react';
import { Label } from '@scaleflex/ui/core';

/** External Dependencies */
import AppContext from 'context';
import { TOGGLE_ORIGINAL_IMAGE_DISPLAY } from 'actions';
import { Union } from 'components/common/icons';
import { StyledSmallButton } from './Topbar.styles';

const ImageDimensionsAndDisplayToggle = () => {
  const { dispatch, isResetted = true, originalImage } = useContext(AppContext);

  const showOriginalImage = useCallback(() => {
    dispatch({
      type: TOGGLE_ORIGINAL_IMAGE_DISPLAY,
      payload: {
        isShow: true,
      },
    });
  }, []);

  const hideOriginalImage = useCallback(() => {
    dispatch({
      typoe: TOGGLE_ORIGINAL_IMAGE_DISPLAY,
      payload: {
        isShow: false,
      },
    });
  }, []);

  if (!originalImage) { return null; }

  return (
    <>
      <Label>
        {`${originalImage.width} x ${originalImage.height} px`}
      </Label>
      <StyledSmallButton
        color="link"
        horizontalMargin="8px"
        onMouseDown={isResetted ? undefined : showOriginalImage}
        onMouseUp={isResetted ? undefined : hideOriginalImage}
        disabled={isResetted}
      >
        <Union />
      </StyledSmallButton>
    </>
  );
};

export default ImageDimensionsAndDisplayToggle;

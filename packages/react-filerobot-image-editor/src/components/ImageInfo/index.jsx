/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import Compare from '@scaleflex/icons/compare';

/** Internal Dependencies */
import { TOGGLE_ORIGINAL_IMAGE_DISPLAY } from 'actions';
import { usePhoneScreen, useStore } from 'hooks';
import getProperDimensions from 'utils/getProperDimensions';
import {
  StyledSmallButton,
  StyledDimensionsLabel,
  StyledImageOptionsButtons,
  StyledDimensionsButtons,
} from './ImageInfo.styled';

const ImageInfo = ({ children, showCompareButton = true, ...props }) => {
  const isPhoneScreen = usePhoneScreen();
  const {
    dispatch,
    isResetted = true,
    originalSource,
    resize = {},
    adjustments: { crop, rotation = 0 },
    shownImageDimensions,
    config: { showBackButton },
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

  const dimensions =
    originalSource &&
    getProperDimensions(
      resize,
      crop,
      shownImageDimensions,
      originalSource,
      rotation,
    );

  const isCompareButtonShown = showCompareButton && originalSource?.src;
  return (
    <StyledImageOptionsButtons
      className="FIE_image_info"
      isPhoneScreen={isPhoneScreen}
      {...props}
    >
      <StyledDimensionsLabel title={t('imageDimensionsHoverTitle')}>
        {`${dimensions?.width || t('width')} × ${
          dimensions?.height || t('height')
        } ${t('px')}`}
      </StyledDimensionsLabel>

      {(children || isCompareButtonShown) && (
        <StyledDimensionsButtons>
          {isCompareButtonShown && (
            <StyledSmallButton
              color="basic"
              onMouseDown={isResetted ? undefined : showOriginalImage}
              onTouchStart={isResetted ? undefined : showOriginalImage}
              disabled={isResetted}
              showBackButton={showBackButton}
              title={t('showImageTitle')}
            >
              <Compare />
            </StyledSmallButton>
          )}
          {children}
        </StyledDimensionsButtons>
      )}
    </StyledImageOptionsButtons>
  );
};

ImageInfo.propTypes = {
  children: PropTypes.node,
  showCompareButton: PropTypes.bool,
};

export default ImageInfo;

/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import LockOutline from '@scaleflex/icons/lock-outline';
import UnlockOutline from '@scaleflex/icons/unlock-outline';
import { Reset } from '@scaleflex/icons';

/** Internal Dependencies */
import { SET_RESIZE, ZOOM_CANVAS } from 'actions';
import { useStore } from 'hooks';
import getProperDimensions from 'utils/getProperDimensions';
import getSizeAfterRotation from 'utils/getSizeAfterRotation';
import getZoomFitFactor from 'utils/getZoomFitFactor';
import restrictNumber from 'utils/restrictNumber';
import { DEFAULT_ZOOM_FACTOR } from 'utils/constants';
import {
  StyledResizeWrapper,
  StyledResizeInput,
  StyledRatioLockIcon,
  StyledResetButton,
} from './Resize.styled';

const Resize = ({ onChange, currentSize, hideResetButton, alignment }) => {
  const {
    dispatch,
    originalImage,
    resize,
    shownImageDimensions,
    adjustments: { crop, rotation = 0 },
    theme,
    t,
  } = useStore();

  const changeResize = (e) => {
    const { name, value } = e.target;
    if (parseFloat(value) < 1) {
      return;
    }
    const maxResizeNumber = Math.min(
      originalImage.width * 10,
      originalImage.height * 10,
    );

    const originalImgSizeAfterRotation = getSizeAfterRotation(
      originalImage.width,
      originalImage.height,
      rotation,
    );
    const newResize = {
      [name]: value ? restrictNumber(value, 0, maxResizeNumber) : value,
    };
    const isHeight = name === 'height';
    const secondDimensionName = isHeight ? 'width' : 'height';
    const isRatioUnlocked = currentSize.ratioUnlocked ?? resize.ratioUnlocked;
    if (!isRatioUnlocked) {
      const originalImgRatio =
        originalImgSizeAfterRotation.width /
        originalImgSizeAfterRotation.height;
      newResize[secondDimensionName] = isHeight
        ? Math.round(newResize[name] * originalImgRatio)
        : Math.round(newResize[name] / originalImgRatio);
    }

    if (
      newResize[name] === resize[name] &&
      newResize[secondDimensionName] === resize[secondDimensionName]
    ) {
      return;
    }

    if (typeof onChange === 'function') {
      onChange(newResize);
      return;
    }

    dispatch({
      type: SET_RESIZE,
      payload: newResize,
    });

    // Fit if there was no resized width/height before for avoiding jumping on change resize
    // as we are simulating zoom relative to original image dimensions but not applying the real original image dimensions
    const dimensUsedInFit =
      (crop.width && crop.height && crop) || shownImageDimensions;
    const updatedResize = { ...resize, ...newResize };
    dispatch({
      type: ZOOM_CANVAS,
      payload: {
        factor:
          updatedResize.width && updatedResize.height
            ? getZoomFitFactor(dimensUsedInFit, updatedResize)
            : DEFAULT_ZOOM_FACTOR,
        isAbsoluteZoom: true,
      },
    });
  };

  const toggleRatioLock = () => {
    if (typeof onChange === 'function') {
      onChange({ ratioUnlocked: !currentSize.ratioUnlocked });
      return;
    }

    dispatch({
      type: SET_RESIZE,
      payload: {
        ratioUnlocked: !resize.ratioUnlocked,
      },
    });
  };

  const resetResize = () => {
    dispatch({
      type: SET_RESIZE,
      payload: {
        width: undefined,
        height: undefined,
        ratioUnlocked: false,
      },
    });
    const dimensUsedInFit =
      (crop.width && crop.height && crop) || shownImageDimensions;
    // Fitting after reset resize
    dispatch({
      type: ZOOM_CANVAS,
      payload: {
        factor: getZoomFitFactor(dimensUsedInFit, dimensUsedInFit),
      },
    });
  };

  const isOriginalSize =
    (typeof resize.width === 'undefined' &&
      typeof resize.height === 'undefined') ||
    (originalImage.width === resize.width &&
      originalImage.height === resize.height);

  const dimensions = getProperDimensions(
    ((currentSize.width || currentSize.height) && currentSize) || resize,
    crop,
    shownImageDimensions,
    originalImage,
    rotation,
  );

  const isManualChangeDisabled = resize.manualChangeDisabled;
  const isEmptyEditedWidth =
    typeof resize.width !== 'undefined' && !resize.width;
  const isEmptyEditedHeight =
    typeof resize.height !== 'undefined' && !resize.height;
  return (
    <StyledResizeWrapper
      className="FIE_resize-tool-options"
      alignment={alignment}
    >
      <StyledResizeInput
        className="FIE_resize-width-option"
        value={isEmptyEditedWidth ? '' : dimensions.width}
        name="width"
        onChange={isManualChangeDisabled ? undefined : changeResize}
        inputMode="numeric"
        title={t('resizeWidthTitle')}
        label={t('width')}
        inputProps={{ type: 'number' }}
        size="sm"
        iconEnd="px"
        placeholder="Width"
        disabled={isManualChangeDisabled}
      />
      <StyledRatioLockIcon
        className="FIE_resize-ratio-locker"
        title={t('toggleRatioLockTitle')}
        onClick={isManualChangeDisabled ? undefined : toggleRatioLock}
        color="basic"
        size="sm"
        disabled={isManualChangeDisabled}
      >
        {currentSize.ratioUnlocked || resize.ratioUnlocked ? (
          <UnlockOutline size={16} color={theme.palette.success} />
        ) : (
          <LockOutline size={16} color={theme.palette.error} />
        )}
      </StyledRatioLockIcon>
      <StyledResizeInput
        className="FIE_resize-height-option"
        value={isEmptyEditedHeight ? '' : dimensions.height}
        name="height"
        onChange={isManualChangeDisabled ? undefined : changeResize}
        inputMode="numeric"
        title={t('resizeHeightTitle')}
        label={t('height')}
        inputProps={{ type: 'number' }}
        size="sm"
        iconEnd="px"
        placeholder="Height"
        disabled={isManualChangeDisabled}
      />
      {!hideResetButton && (
        <StyledResetButton
          className="FIE_resize-reset-button"
          size="sm"
          color="basic"
          onClick={
            isOriginalSize || isManualChangeDisabled ? undefined : resetResize
          }
          disabled={isOriginalSize || isManualChangeDisabled}
        >
          <Reset />
        </StyledResetButton>
      )}
    </StyledResizeWrapper>
  );
};

Resize.defaultProps = {
  onChange: undefined,
  currentSize: {},
  hideResetButton: false,
  alignment: 'center',
};

Resize.propTypes = {
  alignment: PropTypes.string,
  hideResetButton: PropTypes.bool,
  onChange: PropTypes.func,
  currentSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    ratioUnlocked: false,
  }),
};

export default Resize;

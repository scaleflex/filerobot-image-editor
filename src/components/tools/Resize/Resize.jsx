/** External Dependencies */
import React from 'react';
import { Button, Label } from '@scaleflex/ui/core';
import { LockOutline, UnlockOutline } from '@scaleflex/icons';

/** Internal Dependencies */
import { SET_RESIZE } from 'actions';
import restrictNumber from 'utils/restrictNumber';
import { useStore } from 'hooks';
import {
  StyledResizeWrapper,
  StyledResizeInput,
  StyledRatioLockIcon,
} from './Resize.styled';

const Resize = () => {
  const { dispatch, originalImage, resize, theme, t } = useStore();

  const changeResize = (e) => {
    const { name, value } = e.target;

    const newResize = {
      [name]: restrictNumber(value, 1, originalImage[name]),
    };
    const isHeight = name === 'height';
    const secondDimensionName = isHeight ? 'width' : 'height';
    if (!resize.ratioUnlocked) {
      const originalImgRatio = originalImage.width / originalImage.height;
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

    dispatch({
      type: SET_RESIZE,
      payload: newResize,
    });
  };

  const toggleRatioLock = () => {
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
        width: originalImage.width,
        height: originalImage.height,
        ratioUnlocked: false,
      },
    });
  };

  const isOriginalSize =
    (!resize.width && !resize.height) ||
    (originalImage.width === resize.width &&
      originalImage.height === resize.height);

  return (
    <StyledResizeWrapper>
      <StyledResizeInput
        value={resize.width || originalImage.width}
        name="width"
        onChange={changeResize}
        inputMode="numeric"
        title={t('resizeWidthTitle')}
        type="number"
        size="sm"
        placeholder="Width"
      />
      <Label>x</Label>
      <StyledResizeInput
        value={resize.height || originalImage.height}
        name="height"
        onChange={changeResize}
        inputMode="numeric"
        title={t('resizeHeightTitle')}
        type="number"
        size="sm"
        placeholder="Height"
      />
      <StyledRatioLockIcon
        title={t('toggleRatioLockTitle')}
        onClick={toggleRatioLock}
        color="link"
      >
        {resize.ratioUnlocked ? (
          <UnlockOutline color={theme.palette['icons-secondary']} />
        ) : (
          <LockOutline color={theme.palette['icons-secondary']} />
        )}
      </StyledRatioLockIcon>
      <Button
        size="sm"
        onClick={isOriginalSize ? undefined : resetResize}
        disabled={isOriginalSize}
        title={t('resetSize')}
      >
        {t('reset')}
      </Button>
    </StyledResizeWrapper>
  );
};
export default Resize;

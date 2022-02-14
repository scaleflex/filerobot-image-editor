/** External Dependencies */
import React from 'react';
import Minus from '@scaleflex/icons/minus';
import Plus from '@scaleflex/icons/plus';

/** Internal Dependencies */
import { ZOOM_CANVAS } from 'actions';
import { DEFAULT_ZOOM_FACTOR, TOOLS_IDS } from 'utils/constants';
import { useStore } from 'hooks';
import { StyledSmallButton, StyledZoomPercentageLabel } from './Topbar.styled';

const MULTIPLY_ZOOM_FACTOR = 1.1;

const CanvasZooming = () => {
  const { dispatch, zoom = {}, toolId, error, t } = useStore();
  const isBlockerError = error.duration === 0;

  const saveZoom = (zoomFactor) => {
    dispatch({
      type: ZOOM_CANVAS,
      payload: {
        factor: zoomFactor,
        x: 'center',
        y: 'center',
      },
    });
  };

  const zoomIn = () => {
    saveZoom(zoom.factor * MULTIPLY_ZOOM_FACTOR);
  };

  const resetZoomToDefault = () => {
    saveZoom(DEFAULT_ZOOM_FACTOR);
  };

  const zoomOut = () => {
    saveZoom(zoom.factor / MULTIPLY_ZOOM_FACTOR);
  };

  const isZoomDisabled = toolId === TOOLS_IDS.CROP || isBlockerError;

  return (
    <>
      <StyledSmallButton
        onClick={zoomOut}
        color="link"
        title={t('zoomOutTitle')}
        disabled={isZoomDisabled}
      >
        <Minus />
      </StyledSmallButton>
      <StyledZoomPercentageLabel
        title={t('resetZoomTitle')}
        onClick={isZoomDisabled ? undefined : resetZoomToDefault}
        aria-disabled={isZoomDisabled}
      >
        {`${parseInt(zoom.factor * 100, 10)}%`}
      </StyledZoomPercentageLabel>
      <StyledSmallButton
        onClick={zoomIn}
        color="link"
        title={t('zoomInTitle')}
        disabled={isZoomDisabled}
      >
        <Plus />
      </StyledSmallButton>
    </>
  );
};

export default CanvasZooming;

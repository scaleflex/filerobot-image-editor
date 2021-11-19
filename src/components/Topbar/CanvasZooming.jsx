/** External Dependencies */
import React, { useContext } from 'react';
import { Minus, Plus } from '@scaleflex/icons';

/** Internal Dependencies */
import AppContext from 'context';
import { ZOOM_CANVAS } from 'actions';
import { DEFAULT_ZOOM_FACTOR, TOOLS_IDS } from 'utils/constants';
import { StyledSmallButton, StyledZoomPercentageLabel } from './Topbar.styled';

const MULTIPLY_ZOOM_FACTOR = 1.1;

const CanvasZooming = () => {
  const { dispatch, zoom = {}, toolId, t } = useContext(AppContext);

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

  const isZoomDisabled = toolId === TOOLS_IDS.CROP;

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
        onClick={resetZoomToDefault}
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

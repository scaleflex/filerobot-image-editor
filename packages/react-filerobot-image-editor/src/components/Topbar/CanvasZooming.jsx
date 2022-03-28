/** External Dependencies */
import React from 'react';
import Minus from '@scaleflex/icons/minus';
import Plus from '@scaleflex/icons/plus';

/** Internal Dependencies */
import { ZOOM_CANVAS } from 'actions';
import { DEFAULT_ZOOM_FACTOR, TOOLS_IDS } from 'utils/constants';
import { useStore } from 'hooks';
import getZoomFitFactor from 'utils/getZoomFitFactor';
import { StyledSmallButton, StyledZoomPercentageLabel } from './Topbar.styled';

const MULTIPLY_ZOOM_FACTOR = 1.1;

const CanvasZooming = () => {
  const {
    dispatch,
    zoom = {},
    toolId,
    feedback,
    t,
    shownImageDimensions,
    resize,
    originalImage,
    adjustments: { crop },
  } = useStore();
  const isBlockerError = feedback.duration === 0;
  const saveZoom = (zoomFactor) => {
    dispatch({
      type: ZOOM_CANVAS,
      payload: {
        factor: zoomFactor,
      },
    });
  };

  const zoomIn = () => {
    saveZoom(zoom.factor * MULTIPLY_ZOOM_FACTOR);
  };

  const fitCanvas = () => {
    const usedAsOrgDimens =
      (resize.width && resize.height && resize) ||
      (crop.width && crop.height && crop) ||
      shownImageDimensions;
    const fitCanvasFactor = getZoomFitFactor(
      (crop.width && crop.height && crop) || shownImageDimensions,
      usedAsOrgDimens,
    );
    saveZoom(fitCanvasFactor || DEFAULT_ZOOM_FACTOR);
  };

  const zoomOut = () => {
    saveZoom(zoom.factor / MULTIPLY_ZOOM_FACTOR);
  };

  const isZoomDisabled = toolId === TOOLS_IDS.CROP || isBlockerError;
  const previewToRealImgFactor =
    originalImage && !resize.width && !resize.height
      ? Math.min(
          (shownImageDimensions.width * zoom.factor) / originalImage.width,
          (shownImageDimensions.height * zoom.factor) / originalImage.height,
        )
      : zoom.factor;

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
        onClick={isZoomDisabled ? undefined : fitCanvas}
        aria-disabled={isZoomDisabled}
      >
        {`${parseInt(previewToRealImgFactor * 100, 10)}%`}
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

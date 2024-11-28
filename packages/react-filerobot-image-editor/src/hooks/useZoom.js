/**  External Dependencies */
import { useState } from 'react';

/**  Internal Dependencies */
import { ZOOM_CANVAS } from 'actions';
import getZoomFitFactor from 'utils/getZoomFitFactor';
import { DEFAULT_ZOOM_FACTOR, TOOLS_IDS } from 'utils/constants';
import toPrecisedFloat from 'utils/toPrecisedFloat';
import useStore from './useStore';

const MULTIPLY_ZOOM_FACTOR = 1.1;

const useZoom = () => {
  const {
    dispatch,
    zoom = {},
    toolId,
    feedback,
    shownImageDimensions,
    resize,
    originalSource,
    adjustments: { crop },
  } = useStore();
  const isBlockerError = feedback.duration === 0;
  const [zoomingMenuAnchorEl, setZoomingMenuAnchorEl] = useState(null);

  const saveZoom = (zoomFactor, isAbsoluteZoom, zoomCustomLabel) => {
    dispatch({
      type: ZOOM_CANVAS,
      payload: {
        factor: zoomFactor,
        isAbsoluteZoom,
        customLabel: zoomCustomLabel,
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
    saveZoom(fitCanvasFactor || DEFAULT_ZOOM_FACTOR, true);
  };

  const zoomOut = () => {
    saveZoom(zoom.factor / MULTIPLY_ZOOM_FACTOR);
  };

  const toggleZoomingMenu = (event) => {
    setZoomingMenuAnchorEl(zoomingMenuAnchorEl || !event ? null : event.target);
  };

  const applyZoomFactorPreset = (factor, zoomCustomLabel) => {
    if (factor === 'fit') {
      fitCanvas();
      toggleZoomingMenu();
      return;
    }

    const factorToAchieveSelected =
      resize.width || resize.height
        ? factor
        : factor / shownImageDimensions.originalSourceInitialScale;
    saveZoom(factorToAchieveSelected, true, zoomCustomLabel);
    toggleZoomingMenu();
  };

  const getPreviewedZoomLevelLabel = () => {
    if (zoom.customLabel) {
      return zoom.customLabel;
    }

    const previewToRealImgFactor =
      originalSource && !resize.width && !resize.height
        ? shownImageDimensions.originalSourceInitialScale * zoom.factor
        : zoom.factor;
    return `${toPrecisedFloat(previewToRealImgFactor * 100, 0) || '100'}%`;
  };

  const isZoomDisabled = toolId === TOOLS_IDS.CROP || isBlockerError;

  return {
    applyZoomFactorPreset,
    getPreviewedZoomLevelLabel,
    isZoomDisabled,
    fitCanvas,
    zoomIn,
    zoomOut,
    saveZoom,
    toggleZoomingMenu,
    zoomingMenuAnchorEl,
    setZoomingMenuAnchorEl,
  };
};

export default useZoom;

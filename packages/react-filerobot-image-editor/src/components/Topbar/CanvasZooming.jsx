/** External Dependencies */
import React, { useState } from 'react';
import Minus from '@scaleflex/icons/minus';
import Plus from '@scaleflex/icons/plus';
import Menu from '@scaleflex/ui/core/menu';
import MenuItem, { MenuItemLabel } from '@scaleflex/ui/core/menu-item';

/** Internal Dependencies */
import { ZOOM_CANVAS } from 'actions';
import { DEFAULT_ZOOM_FACTOR, TOOLS_IDS } from 'utils/constants';
import { useStore } from 'hooks';
import getZoomFitFactor from 'utils/getZoomFitFactor';
import toPrecisedFloat from 'utils/toPrecisedFloat';
import { StyledSmallButton, StyledZoomPercentageLabel } from './Topbar.styled';
import { ZOOM_FACTORS_PRESETS } from './Topbar.constants';

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
    config: { useZoomPresetsMenu },
  } = useStore();
  const isBlockerError = feedback.duration === 0;
  const [zoomingMenuAnchorEl, setZoomingMenuAnchorEl] = useState(null);
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

  const toggleZoomingMenu = (event) => {
    setZoomingMenuAnchorEl(zoomingMenuAnchorEl ? null : event.target);
  };

  const applyZoomFactorPreset = (factor) => {
    if (factor === 'fit') {
      fitCanvas();
      toggleZoomingMenu();
      return;
    }
    const helperFactorToAchieveSelected = Math.min(
      (factor * originalImage.width) / shownImageDimensions.width,
      (factor * originalImage.height) / shownImageDimensions.height,
    );
    saveZoom(helperFactorToAchieveSelected);
    toggleZoomingMenu();
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
        className="FIE_topbar-zoom-out-btn"
      >
        <Minus />
      </StyledSmallButton>
      <StyledZoomPercentageLabel
        title={t('toggleZoomMenuTitle')}
        onClick={
          isZoomDisabled
            ? undefined
            : (useZoomPresetsMenu && toggleZoomingMenu) || fitCanvas
        }
        aria-disabled={isZoomDisabled}
        className="FIE_topbar-zoom-label"
      >
        {`${toPrecisedFloat(previewToRealImgFactor * 100, 0)}%`}
      </StyledZoomPercentageLabel>
      <StyledSmallButton
        onClick={zoomIn}
        color="link"
        title={t('zoomInTitle')}
        disabled={isZoomDisabled}
        className="FIE_topbar-zoom-in-btn"
      >
        <Plus />
      </StyledSmallButton>
      <Menu
        anchorEl={zoomingMenuAnchorEl}
        onClose={toggleZoomingMenu}
        open={Boolean(zoomingMenuAnchorEl)}
        position="bottom"
        className="FIE_topbar-zoom-menu"
      >
        {ZOOM_FACTORS_PRESETS.map(({ factor, labelKey, label }) => (
          <MenuItem
            key={label || labelKey}
            onClick={() => applyZoomFactorPreset(factor)}
          >
            <MenuItemLabel>{label ?? t(labelKey)}</MenuItemLabel>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CanvasZooming;

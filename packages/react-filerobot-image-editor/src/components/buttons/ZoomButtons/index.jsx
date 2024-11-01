/** External Dependencies */
import React, { useState } from 'react';
import { MinusOutline, PlusOutline, PositionCenter } from '@scaleflex/icons';
import Menu from '@scaleflex/ui/core/menu';
import MenuItem, { MenuItemLabel } from '@scaleflex/ui/core/menu-item';

/** Internal Dependencies */
import { ZOOM_CANVAS } from 'actions';
import { DEFAULT_ZOOM_FACTOR, TOOLS_IDS } from 'utils/constants';
import { useStore } from 'hooks';
import getZoomFitFactor from 'utils/getZoomFitFactor';
import toPrecisedFloat from 'utils/toPrecisedFloat';
import {
  StyledSmallButton,
  StyledZoomPercentageLabel,
  StyledZoomingWrapper,
} from './ZoomButtons.styled';
import { ZOOM_FACTORS_PRESETS } from './ZoomButtons.constants';

const MULTIPLY_ZOOM_FACTOR = 1.1;

const ZoomButtons = (props) => {
  const {
    dispatch,
    zoom = {},
    toolId,
    feedback,
    t,
    shownImageDimensions,
    resize,
    originalSource,
    adjustments: { crop },
    config: { useZoomPresetsMenu, showBackButton },
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

  return (
    <StyledZoomingWrapper className="FIE_buttons-zoom-btns" {...props}>
      <StyledSmallButton
        onClick={zoomOut}
        color="basic"
        title={t('zoomOutTitle')}
        disabled={isZoomDisabled}
        // TODO: Check about showBackButton
        showBackButton={showBackButton}
        className="FIE_buttons-zoom-out-btn"
      >
        <MinusOutline />
      </StyledSmallButton>
      <StyledZoomPercentageLabel
        title={t('toggleZoomMenuTitle')}
        onClick={
          isZoomDisabled
            ? undefined
            : (useZoomPresetsMenu && toggleZoomingMenu) || fitCanvas
        }
        aria-disabled={isZoomDisabled}
        className="FIE_zoom_buttons-zoom-label"
      >
        {getPreviewedZoomLevelLabel()}
      </StyledZoomPercentageLabel>
      <StyledSmallButton
        onClick={zoomIn}
        color="basic"
        title={t('zoomInTitle')}
        disabled={isZoomDisabled}
        // TODO: Check about showBackButton
        showBackButton={showBackButton}
        className="FIE_buttons-zoom-in-btn"
      >
        <PlusOutline />
      </StyledSmallButton>
      <StyledSmallButton
        onClick={() => applyZoomFactorPreset('fit')}
        color="basic"
        title={t('fitTitle')}
        disabled={isZoomDisabled}
        className="FIE_buttons-fit-btn"
      >
        <PositionCenter />
      </StyledSmallButton>
      <Menu
        anchorEl={zoomingMenuAnchorEl}
        onClose={toggleZoomingMenu}
        open={Boolean(zoomingMenuAnchorEl)}
        position="bottom"
        className="FIE_buttons-zoom-menu"
      >
        {ZOOM_FACTORS_PRESETS.map(({ factor, labelKey, label }) => (
          <MenuItem
            key={label || labelKey}
            onClick={() => applyZoomFactorPreset(factor, label)}
          >
            <MenuItemLabel>{labelKey ? t(labelKey) : label}</MenuItemLabel>
          </MenuItem>
        ))}
      </Menu>
    </StyledZoomingWrapper>
  );
};

export default ZoomButtons;
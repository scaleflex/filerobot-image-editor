/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { MinusOutline, PlusOutline, PositionCenter } from '@scaleflex/icons';
import Menu from '@scaleflex/ui/core/menu';
import MenuItem, { MenuItemLabel } from '@scaleflex/ui/core/menu-item';

/** Internal Dependencies */
import { useStore } from 'hooks';
import useZoom from 'hooks/useZoom';
import {
  StyledSmallButton,
  StyledZoomPercentageLabel,
  StyledZoomingWrapper,
} from './ZoomButtons.styled';
import { ZOOM_FACTORS_PRESETS } from './ZoomButtons.constants';

const ZoomButtons = ({ showFitCenterButton = true, ...props }) => {
  const {
    t,
    config: {
      useZoomPresetsMenu,
      showBackButton,
      showFitCenterZoomButton = true,
    },
  } = useStore();
  const {
    zoomOut,
    zoomIn,
    applyZoomFactorPreset,
    getPreviewedZoomLevelLabel,
    isZoomDisabled,
    toggleZoomingMenu,
    fitCanvas,
    zoomingMenuAnchorEl,
  } = useZoom();

  const showFitButton = showFitCenterZoomButton && showFitCenterButton;

  return (
    <StyledZoomingWrapper
      className="FIE_buttons-zoom-btns"
      data-testid="FIE-zoom-buttons-wrapper"
      {...props}
    >
      <StyledSmallButton
        onClick={zoomOut}
        color="basic"
        title={t('zoomOutTitle')}
        disabled={isZoomDisabled}
        // TODO: Check about showBackButton
        showBackButton={showBackButton}
        className="FIE_buttons-zoom-out-btn"
        data-testid="FIE-zoom-out-button"
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
        data-testid="FIE-zoom-percentage-label"
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
        data-testid="FIE-zoom-in-button"
      >
        <PlusOutline />
      </StyledSmallButton>
      {showFitButton && (
        <StyledSmallButton
          onClick={() => applyZoomFactorPreset('fit')}
          color="basic"
          title={t('fitTitle')}
          disabled={isZoomDisabled}
          className="FIE_buttons-fit-btn"
          data-testid="FIE-fit-button"
        >
          <PositionCenter />
        </StyledSmallButton>
      )}
      <Menu
        anchorEl={zoomingMenuAnchorEl}
        onClose={toggleZoomingMenu}
        open={Boolean(zoomingMenuAnchorEl)}
        position="bottom"
        className="FIE_buttons-zoom-menu"
        data-testid="FIE-zoom-menu"
      >
        {ZOOM_FACTORS_PRESETS.map(({ factor, labelKey, label }) => (
          <MenuItem
            key={label || labelKey}
            onClick={() => applyZoomFactorPreset(factor, label)}
            data-testid="FIE-zoom-menu-item"
          >
            <MenuItemLabel>{labelKey ? t(labelKey) : label}</MenuItemLabel>
          </MenuItem>
        ))}
      </Menu>
    </StyledZoomingWrapper>
  );
};

ZoomButtons.propTypes = {
  showFitCenterButton: PropTypes.bool,
};

export default ZoomButtons;

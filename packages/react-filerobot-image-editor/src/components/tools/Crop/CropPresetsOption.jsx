/** External Dependencies */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { SET_CROP, SET_RESIZE, ZOOM_CANVAS } from 'actions';
import { usePhoneScreen, useStore } from 'hooks';
import { StyledToolsBarItemButtonLabel } from 'components/ToolsBar/ToolsBar.styled';
import { DEFAULT_ZOOM_FACTOR, TOOLS_IDS } from 'utils/constants';
import toPrecisedFloat from 'utils/toPrecisedFloat';
import getZoomFitFactor from 'utils/getZoomFitFactor';
import { MoveDownOutline, MoveUpOutline } from '@scaleflex/icons';
import { Menu } from '@scaleflex/ui/core';
import { DEFAULT_CROP_PRESETS } from './Crop.constants';
import CropPresetGroupsList from './CropPresetGroupsFolder';
import CropPresetItem from './CropPresetItem';
import {
  StyledOpenMenuButton,
  StyledMenu,
  StyledToolsBarItemButtonWrapper,
} from './Crop.styled';

const CropPresetsOption = ({ anchorEl, onClose }) => {
  const {
    dispatch,
    t,
    adjustments: {
      crop: { ratio: currentRatio, ratioTitleKey, ratioFolderKey } = {},
    } = {},
    shownImageDimensions,
    config,
    theme,
  } = useStore();
  const cropConfig = config[TOOLS_IDS.CROP];
  const isPhoneScreen = usePhoneScreen();

  const allPresets = useMemo(() => {
    const { presetsItems = [], presetsFolders = [] } = cropConfig;
    return [...presetsFolders, ...DEFAULT_CROP_PRESETS, ...presetsItems];
  }, [cropConfig]);

  const changeCropRatio = (e, newCropRatio, cropProps) => {
    e.stopPropagation();

    const newCrop = {
      ratio: newCropRatio,
      ratioTitleKey: cropProps.ratioTitleKey,
      ratioGroupKey: cropProps.ratioGroupKey,
      ratioFolderKey: cropProps.ratioFolderKey,
    };

    dispatch({
      type: SET_CROP,
      payload: newCrop,
    });

    if (cropConfig.autoResize) {
      dispatch({
        type: SET_RESIZE,
        payload: {
          width: cropProps.width,
          height: cropProps.height,
          manualChangeDisabled: cropProps.disableManualResize,
        },
      });
      dispatch({
        type: ZOOM_CANVAS,
        payload: {
          factor:
            cropProps.width > shownImageDimensions.width ||
            cropProps.height > shownImageDimensions.height
              ? getZoomFitFactor(shownImageDimensions, cropProps)
              : DEFAULT_ZOOM_FACTOR,
        },
      });
    }
    onClose();
  };

  const renderPreset = ({
    titleKey,
    descriptionKey,
    ratio,
    width,
    height,
    groups,
    icon: Icon,
    disableManualResize,
  }) =>
    groups ? (
      <CropPresetGroupsList
        key={titleKey}
        titleKey={titleKey}
        groups={groups}
        Icon={Icon}
        theme={theme}
        onItemSelect={changeCropRatio}
        t={t}
        disableManualResize={disableManualResize}
      />
    ) : (
      <CropPresetItem
        key={ratio}
        ratio={ratio ?? toPrecisedFloat(width / height)}
        titleKey={titleKey}
        t={t}
        description={t(descriptionKey)}
        Icon={Icon}
        isActive={
          currentRatio === (ratio ?? toPrecisedFloat(width / height)) &&
          !ratioFolderKey
        }
        theme={theme}
        width={width}
        height={height}
        onClick={changeCropRatio}
        disableManualResize={disableManualResize}
      />
    );

  const toolTitleKey = ratioTitleKey || 'cropTool';

  return (
    <>
      <StyledToolsBarItemButtonWrapper>
        <StyledToolsBarItemButtonLabel
          className="FIE_crop-tool-label FIE_selected-crop-preset-label"
          isPhoneScreen={isPhoneScreen}
        >
          {t(toolTitleKey)}
        </StyledToolsBarItemButtonLabel>
        <StyledOpenMenuButton
          className="FIE_crop-presets-opener-button"
          color="link-secondary"
          size="lg"
        >
          {anchorEl ? (
            <MoveUpOutline size={10} />
          ) : (
            <MoveDownOutline size={10} />
          )}
        </StyledOpenMenuButton>
      </StyledToolsBarItemButtonWrapper>

      <Menu
        className="FIE_crop-presets-menu"
        anchorEl={anchorEl}
        enableOverlay
        onClose={onClose}
        open={Boolean(anchorEl)}
        position="top"
      >
        <StyledMenu>{allPresets.map(renderPreset)}</StyledMenu>
      </Menu>
    </>
  );
};

CropPresetsOption.defaultProps = {
  anchorEl: null,
};

CropPresetsOption.propTypes = {
  onClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.instanceOf(HTMLElement),
};

export default CropPresetsOption;

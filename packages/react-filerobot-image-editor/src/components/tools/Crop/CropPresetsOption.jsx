/** External Dependencies */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Menu from '@scaleflex/ui/core/menu';

/** Internal Dependencies */
import { SET_CROP, SET_RESIZE, ZOOM_CANVAS } from 'actions';
import { useStore } from 'hooks';
import { StyledToolsBarItemButtonLabel } from 'components/ToolsBar/ToolsBar.styled';
import { DEFAULT_ZOOM_FACTOR, TOOLS_IDS } from 'utils/constants';
import toPrecisedFloat from 'utils/toPrecisedFloat';
import getZoomFitFactor from 'utils/getZoomFitFactor';
import { StyledOpenMenuButton } from './Crop.styled';
import { DEFAULT_CROP_PRESETS } from './Crop.constants';
import CropPresetGroupsList from './CropPresetGroupsFolder';
import CropPresetItem from './CropPresetItem';

const PREFIX_ICONS_DIMENS = { height: 16, width: 16 };

const CropPresetsOption = ({ anchorEl, onClose }) => {
  const {
    dispatch,
    t,
    adjustments: {
      crop: { ratio: currentRatio, ratioTitleKey, ratioFolderKey } = {},
    } = {},
    shownImageDimensions,
    config,
  } = useStore();
  const cropConfig = config[TOOLS_IDS.CROP];

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
        onItemSelect={changeCropRatio}
        prefixIconDimensions={PREFIX_ICONS_DIMENS}
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
        width={width}
        height={height}
        onClick={changeCropRatio}
        disableManualResize={disableManualResize}
      />
    );

  const toolTitleKey = ratioTitleKey || 'cropTool';

  return (
    <>
      <StyledToolsBarItemButtonLabel className="FIE_crop-tool-label FIE_selected-crop-preset-label">
        {t(toolTitleKey)}
      </StyledToolsBarItemButtonLabel>
      <StyledOpenMenuButton
        className="FIE_crop-presets-opener-button"
        color="link"
        size="lg"
      >
        {/* BOTTOM ARROW HTML CODE : TOP ARROW HTML CODE */}
        {anchorEl ? <>&#9652;</> : <>&#9662;</>}
      </StyledOpenMenuButton>
      <Menu
        className="FIE_crop-presets-menu"
        anchorEl={anchorEl}
        enableOverlay
        onClose={onClose}
        open={Boolean(anchorEl)}
        position="top"
      >
        {allPresets.map(renderPreset)}
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

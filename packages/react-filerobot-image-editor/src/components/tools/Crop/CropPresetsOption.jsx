/** External Dependencies */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Menu from '@scaleflex/ui/core/menu';

/** Internal Dependencies */
import { SET_CROP, SET_RESIZE } from 'actions';
import { useStore } from 'hooks';
import { StyledToolsBarItemButtonLabel } from 'components/ToolsBar/ToolsBar.styled';
import { TOOLS_IDS } from 'utils/constants';
import toPrecisedFloat from 'utils/toPrecisedFloat';
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
      crop: { ratio: currentRatio, ratioTitle, ratioFolderKey } = {},
    } = {},
    config,
  } = useStore();
  const cropConfig = config[TOOLS_IDS.CROP];

  const allPresets = useMemo(() => {
    const { presetsItems = [], presetsFolders = [] } = cropConfig;
    return [...presetsFolders, ...DEFAULT_CROP_PRESETS, ...presetsItems];
  }, [cropConfig]);

  const changeCropRatio = (e, newCropRatio, cropProps) => {
    e.stopPropagation();
    if (newCropRatio === currentRatio && ratioTitle === cropProps.ratioTitle) {
      onClose();
      return;
    }

    const newCrop = {
      ratio: newCropRatio,
      ratioTitle: cropProps.ratioTitle,
      ratioGroupKey: cropProps.ratioGroupKey,
      ratioFolderKey: cropProps.ratioFolderKey,
    };

    dispatch({
      type: SET_CROP,
      payload: newCrop,
    });

    if (cropConfig.autoResize && cropProps.width && cropProps.height) {
      dispatch({
        type: SET_RESIZE,
        payload: {
          width: cropProps.width,
          height: cropProps.height,
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
      />
    ) : (
      <CropPresetItem
        key={ratio}
        ratio={ratio ?? toPrecisedFloat(width / height)}
        title={t(titleKey)}
        description={t(descriptionKey)}
        Icon={Icon}
        isActive={
          currentRatio === (ratio ?? toPrecisedFloat(width / height)) &&
          !ratioFolderKey
        }
        width={width}
        height={height}
        onClick={changeCropRatio}
      />
    );

  const toolTitleKey = ratioTitle || 'cropTool';

  return (
    <>
      <StyledToolsBarItemButtonLabel>
        {t(toolTitleKey)}
      </StyledToolsBarItemButtonLabel>
      <StyledOpenMenuButton color="link" size="lg">
        {/* BOTTOM ARROW HTML CODE : TOP ARROW HTML CODE */}
        {anchorEl ? <>&#9652;</> : <>&#9662;</>}
      </StyledOpenMenuButton>
      <Menu
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

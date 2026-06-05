/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { SELECT_TOOL, SET_CROP, SET_RESIZE, ZOOM_CANVAS } from 'actions';
import { useStore } from 'hooks';
import { DEFAULT_ZOOM_FACTOR, ORIGINAL_CROP, TOOLS_IDS } from 'utils/constants';
import toPrecisedFloat from 'utils/toPrecisedFloat';
import getZoomFitFactor from 'utils/getZoomFitFactor';
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';

const CustomCropButtons = (props) => {
  const { isSelected, item, customKey } = props;
  const {
    dispatch,
    t,
    adjustments: { crop: { ratio: appliedRatio } = {} } = {},
    shownImageDimensions,
    config,
  } = useStore();
  const currentRatio = appliedRatio || ORIGINAL_CROP; // we consider original as default one if no ratio has been set.
  const cropConfig = config[TOOLS_IDS.CROP];

  const changeCropRatio = (e, newCropRatio, cropProps) => {
    e.stopPropagation();

    const newCrop = {
      ratio: newCropRatio,
      ratioTitleKey: cropProps.ratioTitleKey,
      ratioGroupKey: cropProps.ratioGroupKey,
      ratioFolderKey: cropProps.ratioFolderKey,
      noEffect: cropProps.noEffect,
    };

    dispatch({
      type: SELECT_TOOL,
      payload: {
        toolId: TOOLS_IDS.CROP,
        dynamicButtons: cropConfig.dynamicButtons,
        dynamicCropToolId: cropProps.ratioTitleKey,
      },
    });

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
  };

  return (
    <ToolsBarItemButton
      key={customKey}
      className="FIE_text-tool-button"
      id={TOOLS_IDS.CROP}
      label={t(item.titleKey)}
      Icon={item.icon}
      onClick={(id, e) =>
        changeCropRatio(e, item.ratio, {
          ratioTitleKey: item.titleKey,
          width: item.width,
          height: item.height,
          disableManualResize: item.disableManualResize,
          noEffect: item.noEffect,
        })
      }
      isSelected={
        isSelected ||
        (currentRatio === 'Crop' && item.ratio === 'custom') ||
        currentRatio ===
          (item.ratio ?? toPrecisedFloat(item.width / item.height))
      }
    />
  );
};

CustomCropButtons.defaultProps = {};

CustomCropButtons.propTypes = {
  customKey: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    titleKey: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    ratio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    descriptionKey: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.elementType, // for HTMLElement or React components
    ]),
    disableManualResize: PropTypes.bool,
    noEffect: PropTypes.bool,
  }).isRequired,
};

export default CustomCropButtons;

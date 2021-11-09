/** External Dependencies */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem } from '@scaleflex/ui/core';

/** Internal Dependencies */
import AppContext from 'context';
import { SET_CROP } from 'actions';
import {
  StyledMenuItemIcon,
  StyledOpenMenuButton,
  StyledRatioLabel,
} from './Crop.styled';
import { CROP_PRESETS } from './Crop.constants';

const PREFIX_ICONS_DIMENS = { height: 16, width: 16 };

const CropPresetsOption = ({ anchorEl, onClose }) => {
  const { dispatch, adjustments: { crop: { ratio: currentRatio } = {} } = {} } =
    useContext(AppContext);

  const changeCropRatio = (e, newCropRatio) => {
    e.stopPropagation();
    if (newCropRatio === currentRatio) {
      return;
    }

    dispatch({
      type: SET_CROP,
      payload: {
        ratio: newCropRatio,
      },
    });
    onClose();
  };

  return (
    <>
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
        {CROP_PRESETS.map(({ title, ratio, ratioLabel, Icon }) => (
          <MenuItem
            key={ratio}
            active={ratio === currentRatio}
            onClick={(e) => changeCropRatio(e, ratio)}
            size="sm"
          >
            {Icon && (
              <StyledMenuItemIcon>
                <Icon {...PREFIX_ICONS_DIMENS} />
              </StyledMenuItemIcon>
            )}
            {title}
            {ratioLabel && <StyledRatioLabel>{ratioLabel}</StyledRatioLabel>}
          </MenuItem>
        ))}
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

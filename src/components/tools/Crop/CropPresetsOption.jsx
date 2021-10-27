/** External Dependencies */
import React, { useContext, useState } from 'react';
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

const CropPresetsOption = () => {
  const { dispatch, adjustments: { crop: { ratio: currentRatio } = {} } = {} } =
    useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const changeCropRatio = (newCropRatio) => {
    if (newCropRatio === currentRatio) {
      return;
    }

    dispatch({
      type: SET_CROP,
      payload: {
        ratio: newCropRatio,
      },
    });
    closeMenu();
  };

  return (
    <>
      <StyledOpenMenuButton
        color="link"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        size="lg"
      >
        {/* BOTTOM ARROW HTML CODE : TOP ARROW HTML CODE */}
        {anchorEl ? <>&#9652;</> : <>&#9662;</>}
      </StyledOpenMenuButton>
      <Menu
        anchorEl={anchorEl}
        enableOverlay
        onClose={closeMenu}
        open={Boolean(anchorEl)}
        position="top"
      >
        {CROP_PRESETS.map(({ title, ratio, ratioLabel, Icon }) => (
          <MenuItem
            key={ratio}
            active={ratio === currentRatio}
            onClick={() => changeCropRatio(ratio)}
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

export default CropPresetsOption;

/** External Dependencies */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Circle, Square, Tick } from '@scaleflex/icons';
import { MenuItem, MenuItemIcon, MenuItemLabel } from '@scaleflex/ui/core';

/** Internal Dependencies */
import {
  StyledActiveMenuItem,
  StyledIconButton,
  StyledMenuArrow,
  StyledMenuPopup,
} from './ObjectRemoval.styled';

const ObjectRemovalBrushType = ({
  isSquareBrushType,
  setIsSquareBrushType,
  t,
}) => {
  const [brushTypeMenuAnchorEl, setBrushTypeMenuAnchorEl] = useState(null);

  const toggleSquareBrushType = () => {
    setIsSquareBrushType((latest) => !latest);
  };

  return (
    <>
      <StyledIconButton
        onClick={toggleSquareBrushType}
        size="sm"
        data-testid="FIE-object-removal-tool-brush-square-type-toggle"
        color="base"
        $margin="0 2px 0 24px"
      >
        {isSquareBrushType ? <Square size={20} /> : <Circle size={20} />}
      </StyledIconButton>
      <StyledIconButton
        onClick={(event) =>
          setBrushTypeMenuAnchorEl(
            brushTypeMenuAnchorEl ? null : event.currentTarget,
          )
        }
        size="sm"
        data-testid="FIE-object-removal-tool-brush-square-type-menu-trigger"
        active={Boolean(brushTypeMenuAnchorEl)}
        color="base"
        $width="16px"
        $height="100%"
        $margin="0 16px 0 0"
      >
        <StyledMenuArrow size={12} $rotate={brushTypeMenuAnchorEl ? 180 : 0} />
      </StyledIconButton>
      <StyledMenuPopup
        onClose={() => setBrushTypeMenuAnchorEl(null)}
        anchorEl={brushTypeMenuAnchorEl}
        position="top"
        open={Boolean(brushTypeMenuAnchorEl)}
        data-testid="FIE-object-removal-tool-brush-square-type-menu"
      >
        <MenuItem
          onClick={() => setIsSquareBrushType(false)}
          active={!isSquareBrushType}
        >
          <MenuItemIcon>
            <Circle size={14} />
          </MenuItemIcon>
          <MenuItemLabel>{t('objectRemovalBrushCircleType')}</MenuItemLabel>
          {!isSquareBrushType && (
            <StyledActiveMenuItem>
              <Tick size={14} />
            </StyledActiveMenuItem>
          )}
        </MenuItem>
        <MenuItem
          onClick={() => setIsSquareBrushType(true)}
          active={isSquareBrushType}
        >
          <MenuItemIcon>
            <Square size={14} />
          </MenuItemIcon>
          <MenuItemLabel>{t('objectRemovalBrushSquareType')}</MenuItemLabel>
          {isSquareBrushType && (
            <StyledActiveMenuItem>
              <Tick size={14} />
            </StyledActiveMenuItem>
          )}
        </MenuItem>
      </StyledMenuPopup>
    </>
  );
};

ObjectRemovalBrushType.propTypes = {
  isSquareBrushType: PropTypes.bool.isRequired,
  setIsSquareBrushType: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default ObjectRemovalBrushType;

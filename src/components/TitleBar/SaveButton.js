import React, { useState } from 'react';
import { Menu, MenuItem } from '@scaleflex/ui/core';
import { Arrow } from '@scaleflex/icons';

import { StyledSaveAsButton, StyledSaveButton, StyledSaveButtonWrapper } from './TitleBar.styled';

const SaveButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <StyledSaveButtonWrapper>
      <StyledSaveButton
        color="primary"
        size="sm"
      >
        Save
      </StyledSaveButton>
      <StyledSaveAsButton
        color="primary"
        size="sm"
        onClick={handleOpen}
      >
        <Arrow />
      </StyledSaveAsButton>
      <Menu
        anchorEl={anchorEl}
        onClose={handleClose}
        open
        position="bottom"
      >
        <MenuItem
          active={false}
          onClick={handleClose}
          size="sm"
        >
          Item 3
        </MenuItem>
      </Menu>
    </StyledSaveButtonWrapper>
  );
};

export default SaveButton;

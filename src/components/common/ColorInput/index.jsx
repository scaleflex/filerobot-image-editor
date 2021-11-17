/** External Dependencies */
import { ColorPicker, Popper } from '@scaleflex/ui/core';
import React, { useState } from 'react';

/** Internal Dependencies */
import { StyledPickerTrigger, StyledPickerWrapper } from './ColorInput.styled';

const ColorInput = ({
  position = 'top',
  color,
  pinnedColors = [],
  onChange,
}) => {
  const [anchorEl, setAnchorEl] = useState();

  const togglePicker = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  return (
    <>
      <StyledPickerTrigger onClick={togglePicker} color={color} />
      <Popper
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        position={position}
        onClick={togglePicker}
        overlay
      >
        <StyledPickerWrapper>
          <ColorPicker
            color={color}
            pinnedColors={pinnedColors}
            setColor={onChange}
          />
        </StyledPickerWrapper>
      </Popper>
    </>
  );
};

export default ColorInput;

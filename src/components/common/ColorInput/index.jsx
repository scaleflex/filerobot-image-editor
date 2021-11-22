/** External Dependencies */
import { Popper } from '@scaleflex/ui/core';
import React, { useState } from 'react';

/** Internal Dependencies */
import { StyledPickerTrigger } from './ColorInput.styled';
import ColorPicker from './ColorPicker';

const ColorInput = ({
  position = 'top',
  // pinnedColors = [],
  // onChange,
  defaultColor = 'rgb(255, 255, 0)', // in hex --#fff000-- or rgb --rgb(255, 255, 0)--
}) => {
  const [anchorEl, setAnchorEl] = useState();
  const [color, setColor] = useState(() => defaultColor);

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
        <ColorPicker onChange={setColor} defaultColor={color} />
      </Popper>
    </>
  );
};

export default ColorInput;

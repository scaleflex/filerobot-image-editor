/** External Dependencies */
import { ColorPicker, Popper } from '@scaleflex/ui/core';
import React, { useState } from 'react';

/** Internal Dependencies */
import { StyledPickerTrigger } from './ColorInput.styled';

const ColorInput = ({ position = 'top', color }) => {
  const [anchorEl, setAnchorEl] = useState();

  const togglePicker = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  // return <input type="color" value={value} onChange={onChange} {...rest} />;
  return (
    <>
      <StyledPickerTrigger onClick={togglePicker} color={color} />
      <Popper anchorEl={anchorEl} open={Boolean(anchorEl)} position={position}>
        <ColorPicker />
      </Popper>
    </>
  );
};

export default ColorInput;

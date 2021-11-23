/** External Dependencies */
import { Popper } from '@scaleflex/ui/core';
import { useStore } from 'hooks';
import React, { useState } from 'react';

/** Internal Dependencies */
import { StyledPickerTrigger } from './ColorInput.styled';
import ColorPicker from './ColorPicker';

const ColorInput = ({ position = 'top', onChange, defaultColor }) => {
  const {
    config: { annotationsCommon = {} },
  } = useStore();
  const [anchorEl, setAnchorEl] = useState();
  const [color, setColor] = useState(
    () => defaultColor || annotationsCommon.fill,
  );

  const togglePicker = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  return (
    <>
      <StyledPickerTrigger
        onClick={togglePicker}
        $color={color}
        onChange={onChange}
      />
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

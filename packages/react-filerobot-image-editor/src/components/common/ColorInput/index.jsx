/** External Dependencies */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popper from '@scaleflex/ui/core/popper';

/** Internal Dependencies */
import { useStore } from 'hooks';
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

  const changeColor = (newColor) => {
    setColor(newColor);
    onChange(newColor);
  };

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
        zIndex={11111}
      >
        <ColorPicker onChange={changeColor} defaultColor={color} />
      </Popper>
    </>
  );
};

ColorInput.defaultProps = {
  position: 'top',
  defaultColor: undefined,
};

ColorInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  position: PropTypes.string,
  defaultColor: PropTypes.string,
};

export default ColorInput;

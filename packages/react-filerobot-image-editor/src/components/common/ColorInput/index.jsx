/** External Dependencies */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Popper from '@scaleflex/ui/core/popper';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { StyledPickerTrigger } from './ColorInput.styled';
import ColorPicker from './ColorPicker';

const ColorInput = ({ position = 'top', onChange, color }) => {
  const {
    config: { annotationsCommon = {} },
  } = useStore();
  const [anchorEl, setAnchorEl] = useState();
  const [currentColor, setCurrentColor] = useState(
    () => color || annotationsCommon.fill,
  );

  const changeColor = (newColor) => {
    setCurrentColor(newColor);
    onChange(newColor);
  };

  const togglePicker = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  return (
    <>
      <StyledPickerTrigger
        onClick={togglePicker}
        $color={currentColor}
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
        <ColorPicker onChange={changeColor} defaultColor={currentColor} />
      </Popper>
    </>
  );
};

ColorInput.defaultProps = {
  position: 'top',
  color: undefined,
};

ColorInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  position: PropTypes.string,
  color: PropTypes.string,
};

export default ColorInput;

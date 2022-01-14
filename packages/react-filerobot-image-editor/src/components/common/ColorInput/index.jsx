/** External Dependencies */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Popper from '@scaleflex/ui/core/popper';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { SET_LATEST_COLOR } from 'actions';
import { StyledColorPicker, StyledPickerTrigger } from './ColorInput.styled';

const pinnedColorsKey = 'fie_pinnedColors';

const ColorInput = ({ position = 'top', onChange, color }) => {
  const {
    config: { annotationsCommon = {} },
    dispatch,
    latestColor,
  } = useStore();
  const isFirstRender = useRef(true);
  const [anchorEl, setAnchorEl] = useState();
  const [currentColor, setCurrentColor] = useState(
    () => latestColor || color || annotationsCommon.fill,
  );
  const [pinnedColors, setPinnedColors] = useState(
    window?.localStorage
      ? JSON.parse(localStorage.getItem(pinnedColorsKey) || '[]')
      : [],
  );

  const changePinnedColors = (newPinnedColors) => {
    if (!window?.localStorage) {
      return;
    }
    const localStoragePinnedColors =
      window.localStorage.getItem(pinnedColorsKey);
    if (JSON.stringify(newPinnedColors) !== localStoragePinnedColors) {
      const maxOfSavedColors = 10;
      const pinnedColorsToSave = newPinnedColors.slice(-maxOfSavedColors);
      window.localStorage.setItem(
        pinnedColorsKey,
        JSON.stringify(pinnedColorsToSave),
      );
      setPinnedColors(pinnedColorsToSave);
    }
  };

  const changeColor = (newColorHex, _rgb, newPinnedColors) => {
    setCurrentColor(newColorHex);
    onChange(newColorHex);
    changePinnedColors(newPinnedColors);
    if (latestColor !== newColorHex) {
      dispatch({
        type: SET_LATEST_COLOR,
        payload: {
          latestColor: newColorHex,
        },
      });
    }
  };

  const togglePicker = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  useEffect(() => {
    if (!isFirstRender.current) {
      setCurrentColor(color);
      isFirstRender.current = false;
    } else {
      onChange(currentColor);
    }
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
        <StyledColorPicker
          onChange={changeColor}
          defaultColor={currentColor}
          pinnedColors={pinnedColors}
        />
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

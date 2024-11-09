/** External Dependencies */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { SET_LATEST_COLOR, SET_LATEST_TEXT_COLOR } from 'actions';
import ColorPickerModal from '../ColorPickerModal';
import { StyledPickerTrigger } from './ColorInput.styled';

const pinnedColorsKey = 'FIE_pinnedColors';

// colorFor is used to save the latest color for a specific purpose (e.g. fill/shadow/stroke)
const ColorInput = ({ onChange, color, colorFor, type }) => {
  const {
    selectionsIds = [],
    config: { annotationsCommon = {} },
    dispatch,
    latestColors = {},
    latestTextColors = {},
  } = useStore();
  let latestColor = latestColors[colorFor];
  let latestTextColor = latestTextColors[colorFor]
  const [anchorEl, setAnchorEl] = useState();
  const [currentColor, setCurrentColor] = useState(
    () => latestColor || color || annotationsCommon.fill,
  );
  const [currentTextColor, setCurrentTextColor] = useState(
    () => latestTextColor || color || annotationsCommon.fill,
  );
  const [pinnedColors, setPinnedColors] = useState(
    window?.localStorage
      ? JSON.parse(localStorage.getItem(pinnedColorsKey) || '[]')
      : [],
  );
  const initialColor = useRef(currentColor);

  const changePinnedColors = (newPinnedColors) => {
    if (!window?.localStorage) {
      return;
    }
    const localStoragePinnedColors =
      window.localStorage.getItem(pinnedColorsKey);
    if (JSON.stringify(newPinnedColors) !== localStoragePinnedColors) {
      const maxOfSavedColors = 9;
      const pinnedColorsToSave = newPinnedColors.slice(-maxOfSavedColors);
      window.localStorage.setItem(
        pinnedColorsKey,
        JSON.stringify(pinnedColorsToSave),
      );
      setPinnedColors(pinnedColorsToSave);
    }
  };

  const changeColor = (_newColorHex, rgba, newPinnedColors) => {

    if (type === 'Text') {
      setCurrentTextColor(rgba);
    } else {
      setCurrentColor(rgba);
    }

    onChange(rgba);
    changePinnedColors(newPinnedColors);

    if (type === 'Text') {
      if (latestTextColor !== rgba) {
        dispatch({
          type: SET_LATEST_TEXT_COLOR,
          payload: {
            latestTextColors: {
              [colorFor]: rgba,
            },
          },
        });
      }
    } else {
      if (latestColor !== rgba) {
        dispatch({
          type: SET_LATEST_COLOR,
          payload: {
            latestColors: {
              [colorFor]: rgba,
            },
          },
        });
      }
    }
  };

  const togglePicker = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const closePicker = (e) => {
    onChange(initialColor.current || currentColor);
    togglePicker(e);
  };

  useEffect(() => {
    if (type === 'Text') {
      const colorToSet = (selectionsIds.length === 0 && latestTextColor) || color;
      setCurrentTextColor(colorToSet);
      onChange(colorToSet);
    } else {
      const colorToSet = (selectionsIds.length === 0 && latestColor) || color;
      setCurrentColor(colorToSet);
      onChange(colorToSet);
    }
  }, [color, selectionsIds]);

  return (
    <>
      <StyledPickerTrigger
        className="FIE_color-picker-triggerer"
        onClick={togglePicker}
        $color={type === 'Text' ? currentTextColor : currentColor}
        onChange={onChange}
      />
      <ColorPickerModal
        hideModalTitle
        onChange={changeColor}
        defaultColor={type === 'Text' ? currentTextColor : currentColor}
        pinnedColors={pinnedColors}
        open={Boolean(anchorEl)}
        onClose={closePicker}
        onApply={togglePicker}
      />
    </>
  );
};

ColorInput.defaultProps = {
  color: undefined,
};

ColorInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  colorFor: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default ColorInput;

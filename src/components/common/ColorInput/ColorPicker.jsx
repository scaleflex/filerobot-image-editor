/** External Dependencies */
import { useDrag } from 'hooks';
import React, { useEffect, useMemo, useRef, useState } from 'react';

/** Internal Dependencies */
import mapNumber from 'utils/mapNumber';
import restrictNumber from 'utils/restrictNumber';
import {
  colorToHsl,
  hexToRgb,
  hslToHex,
  hslToHsv,
  hsvToHsl,
} from './colorConverters';
import {
  StyledColorsBar,
  StyledColorPointer,
  StyledColorsBarWrapper,
  StyledPickerWrapper,
  StyledBarColorStop,
  StyledRangePickerWrapper,
  StyledRangePickerWhiteGradient,
  StyledRangePickerBlackGradient,
} from './ColorInput.styled';

const colorsHuesCount = 360;

const ColorInput = ({
  onChange,
  defaultColor, // in hex --#fff000-- or rgb --rgb(255, 255, 0)--
}) => {
  const barRef = useRef();
  const rangePickerRef = useRef();
  const [bar, setBar] = useState({
    color: '#ff0000',
    pointerLeft: 0,
  });
  const [rangePicker, setRangePicker] = useState({
    color: defaultColor || '#000000',
    pointer: { left: null, top: null },
  });

  const changeRangePickerPointerPosByColor = (color) => {
    const { width, height } = rangePickerRef.current.getBoundingClientRect();
    const colorHsl = colorToHsl(color);
    const colorHsv = hslToHsv(
      colorHsl[0],
      colorHsl[1] / 100,
      colorHsl[2] / 100,
    );
    const left = mapNumber(colorHsv[1], 0, 100, 0, width);
    const top = height - mapNumber(colorHsv[2], 0, 100, 0, height);

    setRangePicker({
      color,
      pointer: { left, top },
    });
  };

  const changeRangePickerColorByPosition = (left, top) => {
    const { width, height } = rangePickerRef.current.getBoundingClientRect();
    const [barColorHue] = colorToHsl(bar.color);
    const restrictedLeft = restrictNumber(left, 0, width);
    const restrictedTop = restrictNumber(top, 0, height);
    const hsl = hsvToHsl(
      barColorHue,
      restrictedLeft / width,
      (height - restrictedTop) / height,
    );

    const hexColor = hslToHex(...hsl);
    setRangePicker({
      color: hexColor,
      pointer: {
        left: restrictedLeft,
        top: restrictedTop,
      },
    });

    if (typeof onChange === 'function') {
      console.log(colorToHsl(hexColor));
      onChange(hexColor, `rgb(${hexToRgb(hexColor).join(', ')})`);
    }
  };

  const updateRangePickerColor = (e) => {
    const rangePickerElem = rangePickerRef.current;
    const { left, top, height, width } =
      rangePickerElem.getBoundingClientRect();
    const pointerLeft = e
      ? restrictNumber(e.pageX - left, 0, width)
      : rangePicker.pointer.left || 0;
    const pointerTop = e
      ? restrictNumber(e.pageY - top, 0, height)
      : rangePicker.pointer.left || 0;
    changeRangePickerColorByPosition(pointerLeft, pointerTop);
  };

  const initColorsBarPointer = () => {
    const { left } = barRef.current.getBoundingClientRect();
    const [h] = colorToHsl(rangePicker.color);
    const targetColorElem = barRef.current.querySelector(`[data-hue='${h}']`);
    const targetColorRgb = targetColorElem?.style?.backgroundColor || bar.color;
    setBar({
      color: targetColorRgb,
      pointerLeft:
        targetColorElem?.getBoundingClientRect?.()?.left - left ||
        bar.pointerLeft,
    });
    changeRangePickerPointerPosByColor(rangePicker.color);
  };

  const changeBarColorByPosition = (pointerLeft) => {
    const barElem = barRef.current;
    const { width } = barElem.getBoundingClientRect();
    const mappedPointerLeft = restrictNumber(
      Math.round(mapNumber(pointerLeft, 0, width, 0, colorsHuesCount)),
      0,
      colorsHuesCount,
    );
    const targetColorElem = barElem.querySelector(
      `[data-hue='${mappedPointerLeft}']`,
    );
    const targetColorRgb = targetColorElem.style.backgroundColor;
    setBar({
      color: targetColorRgb,
      pointerLeft: restrictNumber(pointerLeft, 0, width),
    });
  };

  const updateBarColor = (e) => {
    const barElem = barRef.current;
    const { left } = barElem.getBoundingClientRect();
    const pointerEvent = e.touches?.[0] || e;
    changeBarColorByPosition(pointerEvent.pageX - left);
  };

  const moveBarPointerByArrows = (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
      return;
    }

    changeBarColorByPosition(
      bar.pointerLeft + (e.key === 'ArrowLeft' ? -1 : 1),
    );
  };

  const moveRangePickerPointerByArrows = (e) => {
    const directions = {
      ArrowLeft: -1,
      ArrowUp: -1,
      ArrowRight: 1,
      ArrowDown: 1,
    };
    const currentDirection = directions[e.key];
    if (currentDirection) {
      changeRangePickerColorByPosition(
        (rangePicker.pointer.left || 0) +
          (['ArrowLeft', 'ArrowRight'].includes(e.key) ? currentDirection : 0),
        (rangePicker.pointer.top || 0) +
          (['ArrowUp', 'ArrowDown'].includes(e.key) ? currentDirection : 0),
      );
    }
  };

  useEffect(() => {
    if (rangePicker.pointer.left !== null && rangePicker.pointer.top !== null) {
      changeRangePickerColorByPosition(
        rangePicker.pointer.left,
        rangePicker.pointer.top,
      );
    }
  }, [bar.color]);

  useEffect(() => {
    if (barRef.current) {
      initColorsBarPointer();
    }
  }, []);

  const barPointSliding = useDrag(updateBarColor, updateBarColor);
  const rangePickerPointSliding = useDrag(
    updateRangePickerColor,
    updateRangePickerColor,
  );

  const barColors = useMemo(
    () =>
      Array.from(Array(colorsHuesCount + 1), (_, h) => (
        <StyledBarColorStop
          key={h}
          $color={`hsl(${h}, 100%, 50%)`}
          data-hue={h}
        />
      )),
    [],
  );

  return (
    <StyledPickerWrapper>
      <StyledRangePickerWrapper
        ref={rangePickerRef}
        $color={bar.color}
        {...rangePickerPointSliding}
      >
        <StyledRangePickerWhiteGradient />
        <StyledRangePickerBlackGradient />
        <StyledColorPointer
          tabIndex="-1"
          left={rangePicker.pointer.left || 0}
          top={rangePicker.pointer.top || 0}
          onKeyDown={moveRangePickerPointerByArrows}
          considerTopWidth
        />
      </StyledRangePickerWrapper>
      <StyledColorsBarWrapper {...barPointSliding}>
        <StyledColorsBar ref={barRef}>
          <tbody>
            <tr>{barColors}</tr>
          </tbody>
        </StyledColorsBar>
        <StyledColorPointer
          tabIndex="-1"
          left={bar.pointerLeft}
          onKeyDown={moveBarPointerByArrows}
          style={{ top: -3 }}
        />
      </StyledColorsBarWrapper>
    </StyledPickerWrapper>
  );
};

export default ColorInput;

/** External Dependencies */
import { useDrag } from 'hooks';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import mapNumber from 'utils/mapNumber';
import restrictNumber from 'utils/restrictNumber';
import { colorToHsl, colorToRgb, rgbToHex, rgbToHsl } from './colorConverters';

/** Internal Dependencies */
import {
  StyledColorRangePicker,
  StyledColorsBar,
  StyledColorPointer,
  StyledColorsSliderWrapper,
  StyledPickerWrapper,
  StyledColorRangePickerWrapper,
  StyledColorStop,
} from './ColorInput.styled';

const ColorInput = ({
  onChange,
  // pinnedColors = [],
  defaultColor = '#ffeded', // in hex --#fff000-- or rgb --rgb(255, 255, 0)--
}) => {
  const barRef = useRef();
  const rangePickerRef = useRef();
  const [bar, setBar] = useState({
    color: null,
    pointerLeft: 0,
  });
  const [rangePicker, setRangePicker] = useState({
    color: defaultColor || '#000000',
    pointer: { left: 0, top: 0 },
  });

  const changeRangePickerPointerPosByColor = (color) => {
    const canvas = rangePickerRef.current;
    const { width, height } = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    const imagePixelsInRgb = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height,
    ).data;

    const [r, g, b] = colorToRgb(color);
    for (let i = 0; i < imagePixelsInRgb.length; i += 4) {
      const pixelRgb = imagePixelsInRgb.slice(i, i + 3);
      if (pixelRgb[0] === r && pixelRgb[1] === g && pixelRgb[2] === b) {
        const leftPos = (i / 4) % canvas.width;
        const topPos = Math.floor(i / 4 / canvas.width);

        setRangePicker({
          color: `rgb(${pixelRgb.join(', ')})`,
          pointer: {
            left: mapNumber(leftPos, 0, canvas.width - 1, 0, width),
            top: mapNumber(topPos, 0, canvas.height - 1, 0, height),
          },
        });
        return;
      }
    }
  };

  const changeRangePickerColorByPosition = (left, top) => {
    const canvas = rangePickerRef.current;
    const { width, height } = canvas.getBoundingClientRect();
    const restrictedLeft = restrictNumber(left, 0, width - 1);
    const restrictedTop = restrictNumber(top, 0, height - 1);
    const rgbColor = canvas
      .getContext('2d')
      .getImageData(
        mapNumber(restrictedLeft, 0, width - 1, 0, canvas.width - 1),
        mapNumber(restrictedTop, 0, height - 1, 0, canvas.height - 1),
        1,
        1,
      )
      .data.slice(0, 3);
    const colorRgbString = `rgb(${rgbColor.join(', ')})`;
    // console.log('c:', colorToHsl(colorRgbString), colorRgbString);
    setRangePicker({
      color: colorRgbString,
      pointer: {
        left: restrictedLeft,
        top: restrictedTop,
      },
    });

    if (typeof onChange === 'function') {
      console.log(rgbColor);
      onChange(rgbToHex(...rgbColor), colorRgbString);
    }
  };

  const updateRangePickerColor = (e) => {
    const canvas = rangePickerRef.current;
    const { left, top, height, width } = canvas.getBoundingClientRect();
    const pointerLeft = e
      ? restrictNumber(e.pageX - left, 0, width)
      : rangePicker.pointer.left;
    const pointerTop = e
      ? restrictNumber(e.pageY - top, 0, height)
      : rangePicker.pointer.left;
    changeRangePickerColorByPosition(pointerLeft, pointerTop);
  };

  const changeRangePicker = (currentBarColor, moveToColor) => {
    const canvas = rangePickerRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // We're starting & ending gradients by (+/-)ve 0.1 for containing all colors.
    const colorGradH = ctx.createLinearGradient(0, 0, canvas.width, 0);
    colorGradH.addColorStop(0.1, '#ffffff');
    colorGradH.addColorStop(0.99, currentBarColor);
    const blackGradV = ctx.createLinearGradient(0, 0, 0, canvas.height);
    blackGradV.addColorStop(0.1, 'rgba(0, 0, 0, 0)');
    blackGradV.addColorStop(0.99, '#000000');

    ctx.fillStyle = colorGradH;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = blackGradV;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (moveToColor) {
      changeRangePickerPointerPosByColor(moveToColor);
    } else {
      changeRangePickerColorByPosition(
        rangePicker.pointer.left,
        rangePicker.pointer.top,
      );
    }
  };

  const initColorsBarPointer = () => {
    const { left } = barRef.current.getBoundingClientRect();
    const [h] = colorToHsl(rangePicker.color);
    const targetColorElem = barRef.current.querySelector(`[data-hue='${h}']`);
    if (!targetColorElem) {
      return;
    }
    const targetColorRgb = targetColorElem.style.backgroundColor;
    setBar({
      color: targetColorRgb,
      pointerLeft: targetColorElem.getBoundingClientRect().left - left,
    });
    changeRangePicker(targetColorRgb, rangePicker.color);
  };

  const changeBarColorByPosition = (pointerLeft) => {
    const barElem = barRef.current;
    const { left, width } = barElem.getBoundingClientRect();
    const mappedPointerLeft = Math.round(
      mapNumber(pointerLeft, 0, left, 0, 360),
    );
    const targetColorElem = barElem.querySelector(
      `[data-hue='${mappedPointerLeft}']`,
    );
    if (!targetColorElem) {
      return;
    }
    const targetColorRgb = targetColorElem.style.backgroundColor;
    setBar({
      color: targetColorRgb,
      pointerLeft: restrictNumber(pointerLeft, 0, width),
    });
    // on changing the color of colors bar then change the color of range picker but without moving the pointer position.
    changeRangePicker(targetColorRgb);
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
        rangePicker.pointer.left +
          (['ArrowLeft', 'ArrowRight'].includes(e.key) ? currentDirection : 0),
        rangePicker.pointer.top +
          (['ArrowUp', 'ArrowDown'].includes(e.key) ? currentDirection : 0),
      );
    }
  };

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
      Array.from(Array(361), (_, h) => (
        <StyledColorStop key={h} color={`hsl(${h}, 100%, 50%)`} data-hue={h} />
      )),
    [],
  );

  return (
    <StyledPickerWrapper>
      <StyledColorRangePickerWrapper {...rangePickerPointSliding}>
        <StyledColorRangePicker width="100" height="100" ref={rangePickerRef} />
        <StyledColorPointer
          tabIndex="-1"
          left={rangePicker.pointer.left}
          top={rangePicker.pointer.top}
          onKeyDown={moveRangePickerPointerByArrows}
          considerTopWidth
        />
      </StyledColorRangePickerWrapper>
      <StyledColorsSliderWrapper {...barPointSliding}>
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
      </StyledColorsSliderWrapper>
    </StyledPickerWrapper>
  );
};

export default ColorInput;

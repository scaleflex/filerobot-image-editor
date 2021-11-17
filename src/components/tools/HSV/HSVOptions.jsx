/** External Dependencies */
import React from 'react';
import Konva from 'konva';

/** Internal Dependencies */
import { useFinetune } from 'hooks';
import Slider from 'components/common/Slider';
import { Label } from '@scaleflex/ui/core';
import { StyledSliderContainer } from './HSV.styled';

const DEFAULT_VALUE = {
  hue: 0,
  saturation: 0,
  value: 0,
};

const sliderStyle = { padding: 0 };

const HSVOptions = () => {
  const [finetuneProps, setFinetuneProps] = useFinetune(
    Konva.Filters.HSV,
    DEFAULT_VALUE,
  );

  const changeValue = (name, value) => {
    setFinetuneProps({
      [name]: +value,
    });
  };

  return (
    <>
      <StyledSliderContainer>
        <Label>Hue</Label>
        <Slider
          start={0}
          step={1}
          end={259}
          value={finetuneProps.hue ?? DEFAULT_VALUE.hue}
          onChange={(val) => changeValue('hue', val)}
          style={sliderStyle}
        />
      </StyledSliderContainer>
      <StyledSliderContainer>
        <Label>Saturation</Label>
        <Slider
          start={-2}
          step={0.5}
          end={10}
          value={finetuneProps.saturation ?? DEFAULT_VALUE.saturation}
          onChange={(val) => changeValue('saturation', val)}
          style={sliderStyle}
        />
      </StyledSliderContainer>
      <StyledSliderContainer>
        <Label>Value</Label>
        <Slider
          start={-2}
          step={0.1}
          end={2}
          value={finetuneProps.value ?? DEFAULT_VALUE.value}
          onChange={(val) => changeValue('value', val)}
          style={sliderStyle}
        />
      </StyledSliderContainer>
    </>
  );
};

export default HSVOptions;

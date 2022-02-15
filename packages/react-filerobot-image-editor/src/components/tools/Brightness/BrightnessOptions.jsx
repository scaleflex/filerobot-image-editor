/** External Dependencies */
import React from 'react';
import Konva from 'konva';

/** Internal Dependencies */
import { useFinetune } from 'hooks';
import restrictNumber from 'utils/restrictNumber';
import Slider from 'components/common/Slider';

const MIN_VALUE = -1;
const DEFAULT_VALUE = {
  brightness: 0,
};
const MAX_VALUE = 1;
const sliderStyle = { width: 150, padding: 0 };

const BrightnessOptions = () => {
  const [finetuneProps, setFinetuneProps] = useFinetune(
    Konva.Filters.Brighten,
    DEFAULT_VALUE,
  );

  const changeValue = (value) => {
    setFinetuneProps({
      brightness: restrictNumber(value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <Slider
      className="FIE_brightness-option"
      min={MIN_VALUE}
      step={0.05}
      max={MAX_VALUE}
      value={finetuneProps.brightness ?? DEFAULT_VALUE.brightness}
      onChange={changeValue}
      style={sliderStyle}
    />
  );
};

export default BrightnessOptions;

/** External Dependencies */
import React from 'react';
import Konva from 'konva';

/** Internal Dependencies */
import { useFinetune } from 'hooks';
import restrictNumber from 'utils/restrictNumber';
import Slider from 'components/common/Slider';

const MIN_VALUE = 0;
const DEFAULT_VALUE = {
  blurRadius: MIN_VALUE,
};
const MAX_VALUE = 100;
const sliderStyle = { width: 150, padding: 0 };

const BlurOptions = () => {
  const [finetuneProps, setFinetuneProps] = useFinetune(
    Konva.Filters.Blur,
    DEFAULT_VALUE,
  );

  const changeValue = (value) => {
    setFinetuneProps({
      blurRadius: restrictNumber(value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <Slider
      className="FIE_blur-option"
      min={MIN_VALUE}
      max={MAX_VALUE}
      value={finetuneProps.blurRadius ?? DEFAULT_VALUE.blurRadius}
      onChange={changeValue}
      style={sliderStyle}
    />
  );
};

export default BlurOptions;

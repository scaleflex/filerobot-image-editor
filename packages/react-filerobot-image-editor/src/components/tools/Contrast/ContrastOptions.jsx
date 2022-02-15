/** External Depdencies */
import React from 'react';
import Konva from 'konva';

/** Internal Depdencies */
import { useFinetune } from 'hooks';
import restrictNumber from 'utils/restrictNumber';
import Slider from 'components/common/Slider';

const MIN_VALUE = -100;
const DEFAULT_VALUE = {
  contrast: 0,
};
const MAX_VALUE = 100;
const sliderStyle = { width: 150, padding: 0 };

const ContrastOptions = () => {
  const [finetuneProps, setFinetuneProps] = useFinetune(
    Konva.Filters.Contrast,
    DEFAULT_VALUE,
  );

  const changeValue = (value) => {
    setFinetuneProps({
      contrast: restrictNumber(value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <Slider
      className="FIE_contrast-option"
      min={MIN_VALUE}
      max={MAX_VALUE}
      value={finetuneProps.contrast ?? DEFAULT_VALUE.contrast}
      onChange={changeValue}
      style={sliderStyle}
    />
  );
};

export default ContrastOptions;

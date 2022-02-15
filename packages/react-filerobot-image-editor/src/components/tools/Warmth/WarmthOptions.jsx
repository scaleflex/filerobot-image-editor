/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useFinetune } from 'hooks';
import restrictNumber from 'utils/restrictNumber';
import { Warmth as CustomWarmth } from 'custom/finetunes';
import Slider from 'components/common/Slider';

const MIN_VALUE = 0;
const DEFAULT_VALUE = {
  warmth: MIN_VALUE,
};
const MAX_VALUE = 200;
const sliderStyle = { width: 150, padding: 0 };

const WarmthOptions = () => {
  const [finetuneProps, setFinetuneProps] = useFinetune(
    CustomWarmth,
    DEFAULT_VALUE,
  );

  const changeValue = (value) => {
    setFinetuneProps({
      warmth: restrictNumber(value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <Slider
      className="FIE_warmth-option"
      min={MIN_VALUE}
      max={MAX_VALUE}
      value={finetuneProps.warmth ?? DEFAULT_VALUE.warmth}
      onChange={changeValue}
      style={sliderStyle}
    />
  );
};

export default WarmthOptions;

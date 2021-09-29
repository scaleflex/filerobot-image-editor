/** External Dependencies */
import React from 'react';
import Konva from 'konva';

/** Internal Dependencies */
import { useFinetune } from 'hooks';
import restrictNumber from 'utils/restrictNumber';

const MIN_VALUE = -1;
const DEFAULT_VALUE = {
  brightness: 0,
};
const MAX_VALUE = 1;

const BrightnessOptions = () => {
  const [finetuneProps, setFinetuneProps] = useFinetune(
    Konva.Filters.Brighten,
    DEFAULT_VALUE,
  );

  const changeValue = (e) => {
    setFinetuneProps({
      brightness: restrictNumber(e.target.value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <input
      type="range"
      min={MIN_VALUE}
      step="0.05"
      max={MAX_VALUE}
      value={finetuneProps.brightness ?? DEFAULT_VALUE.brightness}
      onChange={changeValue}
    />
  );
};

export default BrightnessOptions;

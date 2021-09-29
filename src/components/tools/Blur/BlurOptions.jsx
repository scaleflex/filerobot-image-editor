/** External Dependencies */
import React from 'react';
import Konva from 'konva';

/** Internal Dependencies */
import { useFinetune } from 'hooks';
import restrictNumber from 'utils/restrictNumber';

const MIN_VALUE = 0;
const DEFAULT_VALUE = {
  blurRadius: MIN_VALUE,
};
const MAX_VALUE = 40;

const BlurOptions = () => {
  const [finetuneProps, setFinetuneProps] = useFinetune(
    Konva.Filters.Blur,
    DEFAULT_VALUE,
  );

  const changeValue = (e) => {
    setFinetuneProps({
      blurRadius: restrictNumber(e.target.value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <input
      type="range"
      min={MIN_VALUE}
      step="1"
      max={MAX_VALUE}
      value={finetuneProps.blurRadius ?? DEFAULT_VALUE.blurRadius}
      onChange={changeValue}
    />
  );
};

export default BlurOptions;

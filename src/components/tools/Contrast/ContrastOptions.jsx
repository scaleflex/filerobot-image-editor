/** External Depdencies */
import React from 'react';
import Konva from 'konva';

/** Internal Depdencies */
import { useFinetune } from 'hooks';
import restrictNumber from 'utils/restrictNumber';

const MIN_VALUE = -100;
const DEFAULT_VALUE = {
  contrast: 0,
};
const MAX_VALUE = 100;

const ContrastOptions = () => {
  const [finetuneProps, setFinetuneProps] = useFinetune(
    Konva.Filters.Contrast,
    DEFAULT_VALUE,
  );

  const changeValue = (e) => {
    setFinetuneProps({
      contrast: restrictNumber(e.target.value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <input
      type="range"
      min={MIN_VALUE}
      step="1"
      max={MAX_VALUE}
      value={finetuneProps.contrast ?? DEFAULT_VALUE.contrast}
      onChange={changeValue}
    />
  );
};

export default ContrastOptions;

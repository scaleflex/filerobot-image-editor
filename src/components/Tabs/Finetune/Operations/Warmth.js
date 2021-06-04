import React from 'react';

import { FintuneOperationWrapper } from './Operations.styled';
import useImageFilter from '../../../../hooks/useImageFilter';

const defaultValueRGB = [1, 1, 1];
const MIN_VALUE = 0.01;
const MAX_VALUE = 2.20;

// Red > Blue means warmer effect
// Red < Blue means cooler effect
const Warmth = () => {
  const [value, setValue] = useImageFilter({
    stateFilterName: 'gamma',
    defaultValue: defaultValueRGB // R,G,B
  });

  const changeValue = (e) => {
    let newValue = [...value];
    const blue = newValue[2];

    if (e.target.value === 1) {
      newValue = defaultValueRGB;
    } else if (e.target.value < 1) {
      newValue[2] = (MAX_VALUE - (+e.target.value));
      newValue[0] = +Math.max(MIN_VALUE, e.target.value);
    } else {
      newValue[2] = +Math.max(MIN_VALUE, blue - (e.target.value - 1));
      newValue[0] = +e.target.value;
    }

    setValue(newValue);
  }

  return (
    <FintuneOperationWrapper>
      <input type="range" min={MIN_VALUE} step="0.01" max={MAX_VALUE} value={value[0]} onChange={changeValue} />
    </FintuneOperationWrapper>
  );
}

export default Warmth;

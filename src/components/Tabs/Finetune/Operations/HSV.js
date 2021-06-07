import React from 'react';

import { FintuneOperationWrapper } from './Operations.styled';
import useImageFilter from '../../../../hooks/useImageFilter';

const HSV = () => {
  const [value, setValue] = useImageFilter({
    filterClassNameInLib: 'HSV',
    valueObject: {
      hue: 0,
      saturation: 0,
      value: 0,
    }
  });

  const changeValue = (e) => {
    setValue({
      [e.target.name]: +e.target.value
    });
  }

  return (
    <FintuneOperationWrapper>
      Hue
      <input type="range" min="0" step="1" max="259" value={value.hue} onChange={changeValue} name="hue" />
      Saturation
      <input type="range" min="-2" step="0.5" max="10" value={value.saturation} onChange={changeValue} name="saturation" />
      Value
      <input type="range" min="-2" step="0.1" max="2" value={value.value} onChange={changeValue} name="value" />
    </FintuneOperationWrapper>
  );
}

export default HSV;

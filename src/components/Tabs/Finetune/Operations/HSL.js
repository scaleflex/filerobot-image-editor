import React from 'react';

import { FintuneOperationWrapper } from './Operations.styled';
import useImageFilter from '../../../../hooks/useImageFilter';

const HSL = () => {
  const [value, setValue] = useImageFilter({
    filterClassNameInLib: 'HSL',
    valueObject: {
      hue: 0,
      saturation: 0,
      luminance: 0,
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
      Luminance
      <input type="range" min="-2" step="0.1" max="2" value={value.luminance} onChange={changeValue} name="luminance" />
    </FintuneOperationWrapper>
  );
}

export default HSL;

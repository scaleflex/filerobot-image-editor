import React from 'react';

import { FintuneOperationWrapper } from './Operations.styled';
import useImageFilter from '../../../../hooks/useImageFilter';

const Brightness = () => {
  const [value, setValue] = useImageFilter({
    filterClassNameInLib: 'Brighten',
    valueObject: {
      brightness: 0
    }
  });

  const changeValue = (e) => {
    setValue({
      brightness: +e.target.value
    });
  }

  return (
    <FintuneOperationWrapper>
      <input type="range" min="-1" step="0.1" max="1" value={value.brightness} onChange={changeValue} />
    </FintuneOperationWrapper>
  );
}

export default Brightness;

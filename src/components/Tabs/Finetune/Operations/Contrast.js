import React from 'react';

import { FintuneOperationWrapper } from './Operations.styled';
import useImageFilter from '../../../../hooks/useImageFilter';

const Contrast = () => {
  const [value, setValue] = useImageFilter({
    filterClassNameInLib: 'Contrast',
    valueObject: {
      contrast: 0
    }
  });

  const changeValue = (e) => {
    setValue({
      contrast: +e.target.value
    });
  }

  return (
    <FintuneOperationWrapper>
      <input type="range" min="-100" step="1" max="100" value={value.contrast} onChange={changeValue} />
    </FintuneOperationWrapper>
  );
}

export default Contrast;

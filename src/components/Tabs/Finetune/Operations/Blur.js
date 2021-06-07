import React from 'react';

import { FintuneOperationWrapper } from './Operations.styled';
import useImageFilter from '../../../../hooks/useImageFilter';

const Blur = () => {
  const [value, setValue] = useImageFilter({
    filterClassNameInLib: 'Blur',
    valueObject: {
      blurRadius: 0
    }
  });

  const changeValue = (e) => {
    setValue({
      blurRadius: +e.target.value
    });
  }

  return (
    <FintuneOperationWrapper>
      <input type="range" min="0" step="1" max="40" value={value.blurRadius} onChange={changeValue} />
    </FintuneOperationWrapper>
  );
}

export default Blur;

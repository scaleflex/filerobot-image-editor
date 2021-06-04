import React from 'react';

import { FintuneOperationWrapper } from './Operations.styled';
import useImageFilter from '../../../../hooks/useImageFilter';

const Saturation = () => {
  const [value, setValue] = useImageFilter({
    stateFilterName: 'saturation'
  });

  const changeValue = (e) => {
    setValue(e.target.value);
  }

  return (
    <FintuneOperationWrapper>
      <input type="range" min="0" step="1" max="100" value={value} onChange={changeValue} />
    </FintuneOperationWrapper>
  );
}

export default Saturation;

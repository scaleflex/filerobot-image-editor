import React from 'react';

import { FintuneOperationWrapper } from './Operations.styled';
import useImageFilter from '../../../../hooks/useImageFilter';

const Contrast = () => {
  const [value, setValue] = useImageFilter({ stateFilterName: 'contrast' });

  const changeValue = (e) => {
    setValue(e.target.value);
  }

  return (
    <FintuneOperationWrapper>
      <input type="range" min="-1" step="0.1" max="1" value={value} onChange={changeValue} />
    </FintuneOperationWrapper>
  );
}

export default Contrast;

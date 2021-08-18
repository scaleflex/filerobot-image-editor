import React from 'react';

import { FintuneOperationWrapper } from './Operations.styled';
import useImageFilter from '../../../../hooks/useImageFilter';

const Threshold = () => {
  const [value, setValue] = useImageFilter({
    filterClassNameInLib: 'CustomThreshold',
    valueObject: {
      threshold: 0
    }
  });

  const changeValue = (e) => {
    setValue({
      threshold: +e.target.value
    });
  }

  return (
    <FintuneOperationWrapper>
      <input type="range" min="0" step="1" max="255" value={value.threshold} onChange={changeValue} />
    </FintuneOperationWrapper>
  );
}

export default Threshold;

import React from 'react';

import useFinetuneFilter from 'hooks/useFinetuneFilter';
import restrictNumber from 'utils/restrictNumber';
import { FintuneOperationWrapper } from './Operations.styled';

const MIN_VALUE = 0;
const MAX_VALUE = 255;

const Threshold = () => {
  const [value, setValue] = useFinetuneFilter({
    filterClassNameInLib: 'CustomThreshold',
    valueObject: {
      threshold: 0,
    },
  });

  const changeValue = (e) => {
    setValue({
      threshold: restrictNumber(e.target.value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <FintuneOperationWrapper>
      <input
        type="range"
        min={MIN_VALUE}
        step="1"
        max={MAX_VALUE}
        value={value.threshold}
        onChange={changeValue}
      />
    </FintuneOperationWrapper>
  );
};

export default Threshold;

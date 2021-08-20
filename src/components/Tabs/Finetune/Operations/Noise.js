import React from 'react';

import useFinetuneFilter from 'hooks/useFinetuneFilter';
import restrictNumber from 'utils/restrictNumber';
import { FintuneOperationWrapper } from './Operations.styled';

const MIN_VALUE = 0;
const MAX_VALUE = 5;

const Noise = () => {
  const [value, setValue] = useFinetuneFilter({
    filterClassNameInLib: 'Noise',
    valueObject: {
      noise: 0,
    },
  });

  const changeValue = (e) => {
    setValue({
      noise: restrictNumber(e.target.value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <FintuneOperationWrapper>
      <input
        type="range"
        min={MIN_VALUE}
        step="0.05"
        max={MAX_VALUE}
        value={value.noise}
        onChange={changeValue}
      />
    </FintuneOperationWrapper>
  );
};

export default Noise;

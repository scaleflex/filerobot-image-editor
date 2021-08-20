import React from 'react';

import useFinetuneFilter from 'hooks/useFinetuneFilter';
import restrictNumber from 'utils/restrictNumber';
import { FintuneOperationWrapper } from './Operations.styled';

const MIN_VALUE = 0;
const MAX_VALUE = 200;

const Warmth = () => {
  const [value, setValue] = useFinetuneFilter({
    filterClassNameInLib: 'Warmth',
    valueObject: {
      warmth: 0,
    },
  });

  const changeValue = (e) => {
    setValue({
      warmth: restrictNumber(e.target.value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <FintuneOperationWrapper>
      <input
        type="range"
        min={MIN_VALUE}
        step="0.01"
        max={MAX_VALUE}
        value={value.warmth}
        onChange={changeValue}
      />
    </FintuneOperationWrapper>
  );
};

export default Warmth;

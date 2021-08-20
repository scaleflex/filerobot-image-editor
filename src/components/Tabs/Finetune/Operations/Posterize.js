import React from 'react';

import useFinetuneFilter from 'hooks/useFinetuneFilter';
import restrictNumber from 'utils/restrictNumber';
import { FintuneOperationWrapper } from './Operations.styled';

const MIN_VALUE = 0;
const MAX_VALUE = 1;

const Posterize = () => {
  const [value, setValue] = useFinetuneFilter({
    filterClassNameInLib: 'Posterize',
    valueObject: {
      levels: 1,
    },
  });

  const changeValue = (e) => {
    setValue({
      levels: restrictNumber(e.target.value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <FintuneOperationWrapper>
      <input
        type="range"
        min={MIN_VALUE}
        step="0.2"
        max={MAX_VALUE}
        value={value.levels}
        onChange={changeValue}
      />
    </FintuneOperationWrapper>
  );
};

export default Posterize;

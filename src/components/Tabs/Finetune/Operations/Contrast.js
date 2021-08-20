import React from 'react';

import useFinetuneFilter from 'hooks/useFinetuneFilter';
import restrictNumber from 'utils/restrictNumber';
import { FintuneOperationWrapper } from './Operations.styled';

const MIN_VALUE = -100;
const MAX_VALUE = 100;

const Contrast = () => {
  const [value, setValue] = useFinetuneFilter({
    filterClassNameInLib: 'Contrast',
    valueObject: {
      contrast: 0,
    },
  });

  const changeValue = (e) => {
    setValue({
      contrast: restrictNumber(e.target.value),
    });
  };

  return (
    <FintuneOperationWrapper>
      <input
        type="range"
        min={MIN_VALUE}
        step="1"
        max={MAX_VALUE}
        value={value.contrast}
        onChange={changeValue}
      />
    </FintuneOperationWrapper>
  );
};

export default Contrast;

import React from 'react';

import useFinetuneFilter from 'hooks/useFinetuneFilter';
import restrictNumber from 'utils/restrictNumber';
import { FintuneOperationWrapper } from './Operations.styled';

const MIN_VALUE = 0;
const MAX_VALUE = 40;

const Blur = () => {
  const [value, setValue] = useFinetuneFilter({
    filterClassNameInLib: 'Blur',
    valueObject: {
      blurRadius: 0,
    },
  });

  const changeValue = (e) => {
    setValue({
      blurRadius: restrictNumber(e.target.value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <FintuneOperationWrapper>
      <input
        type="range"
        min={MIN_VALUE}
        step="1"
        max={MAX_VALUE}
        value={value.blurRadius}
        onChange={changeValue}
      />
    </FintuneOperationWrapper>
  );
};

export default Blur;

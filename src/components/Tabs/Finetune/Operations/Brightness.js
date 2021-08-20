import React from 'react';

import useFinetuneFilter from 'hooks/useFinetuneFilter';
import restrictNumber from 'utils/restrictNumber';
import { FintuneOperationWrapper } from './Operations.styled';

const MIN_VALUE = -1;
const MAX_VALUE = 1;

const Brightness = () => {
  const [value, setValue] = useFinetuneFilter({
    filterClassNameInLib: 'Brighten',
    valueObject: {
      brightness: 0,
    },
  });

  const changeValue = (e) => {
    setValue({
      brightness: restrictNumber(e.target.value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <FintuneOperationWrapper>
      <input
        type="range"
        min={MIN_VALUE}
        step="0.05"
        max={MAX_VALUE}
        value={value.brightness}
        onChange={changeValue}
      />
    </FintuneOperationWrapper>
  );
};

export default Brightness;

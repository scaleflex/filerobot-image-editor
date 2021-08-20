import React from 'react';

import restrictNumber from 'utils/restrictNumber';
import useFinetuneFilter from 'hooks/useFinetuneFilter';
import { FintuneOperationWrapper } from './Operations.styled';

const MIN_VALUE = 1;
const MAX_VALUE = 100;

const Pixelate = () => {
  const [value, setValue] = useFinetuneFilter({
    filterClassNameInLib: 'Pixelate',
    valueObject: {
      pixelSize: 1,
    },
  });

  const changeValue = (e) => {
    setValue({
      pixelSize: restrictNumber(e.target.value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <FintuneOperationWrapper>
      <input
        type="range"
        min={MIN_VALUE}
        step="1"
        max={MAX_VALUE}
        value={value.pixelSize}
        onChange={changeValue}
      />
    </FintuneOperationWrapper>
  );
};

export default Pixelate;

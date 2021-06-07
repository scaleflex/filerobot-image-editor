import React from 'react';

import { FintuneOperationWrapper } from './Operations.styled';
import useImageFilter from '../../../../hooks/useImageFilter';

const Grayscale = () => {
  // const [value, setValue] = useImageFilter({
  //   filterClassNameInLib: 'Grayscale',
  //   valueObject: {}
  // });
  useImageFilter({
    filterClassNameInLib: 'Grayscale',
    valueObject: {}
  });

  // TODO: add disable/enable if not used to apply button
  return (
    <FintuneOperationWrapper />
  );
}

export default Grayscale;

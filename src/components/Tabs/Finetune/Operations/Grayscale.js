import React from 'react';

import { FintuneOperationWrapper, GrayscaleModeRadio } from './Operations.styled';
import useImageFilter from '../../../../hooks/useImageFilter';
import upperCaseFirstLetter from '../../../../utils/upperCaseFirstLetter';

const MODES = [
  'average',
  'luminosity',
  'lightness',
]

const Grayscale = () => {
  const [value, setValue] = useImageFilter({
    stateFilterName: 'grayscale',
    propertyNameInFabricClass: 'mode',
    defaultValue: MODES[0]
  });

  const changeValue = (mode) => {
    setValue(mode);
  }

  return (
    <FintuneOperationWrapper rowFlexDisplay>
      {MODES.map((mode) => (
        <GrayscaleModeRadio
          checked={value === mode}
          label={upperCaseFirstLetter(mode)}
          onChange={() => changeValue(mode)}
          key={mode}
        />
      ))}
    </FintuneOperationWrapper>
  );
}

export default Grayscale;

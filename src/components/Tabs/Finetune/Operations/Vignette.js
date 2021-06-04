import React from 'react';

import { FintuneOperationWrapper } from './Operations.styled';
import useImageFilter from '../../../../hooks/useImageFilter';

const Vignette = () => {
  const [value, setValue] = useImageFilter({
    stateFilterName: 'blendColor',
    filterClassNameInFabric: 'BlendColor',
    defaultProperties: {
      color: 'ok'
    }
  });

  const changeValue = (e) => {
    // setValue(e.target.value);
  }

  return (
    <FintuneOperationWrapper>
      <input type="range" min="0" step="0.1" max="1" value={value} onChange={changeValue} />
    </FintuneOperationWrapper>
  );
}

export default Vignette;

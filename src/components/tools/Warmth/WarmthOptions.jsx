/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useFinetune } from 'hooks';
import restrictNumber from 'utils/restrictNumber';
import { Warmth as CustomWarmth } from 'custom/finetunes';

const MIN_VALUE = 0;
const DEFAULT_VALUE = {
  warmth: MIN_VALUE,
};
const MAX_VALUE = 200;

const WarmthOptions = () => {
  const [finetuneProps, setFinetuneProps] = useFinetune(
    CustomWarmth,
    DEFAULT_VALUE,
  );

  const changeValue = (e) => {
    setFinetuneProps({
      warmth: restrictNumber(e.target.value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <input
      type="range"
      min={MIN_VALUE}
      step="0.01"
      max={MAX_VALUE}
      value={finetuneProps.warmth ?? DEFAULT_VALUE.warmth}
      onChange={changeValue}
    />
  );
};

export default WarmthOptions;

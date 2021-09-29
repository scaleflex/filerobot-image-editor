/** External Dependencies */
import React from 'react';
import Konva from 'konva';

/** Internal Dependencies */
import { useFinetune } from 'hooks';

const DEFAULT_VALUE = {
  hue: 0,
  saturation: 0,
  value: 0,
};

const HSVOptions = () => {
  const [finetuneProps, setFinetuneProps] = useFinetune(
    Konva.Filters.HSV,
    DEFAULT_VALUE,
  );

  const changeValue = (e) => {
    setFinetuneProps({
      [e.target.name]: +e.target.value,
    });
  };

  return (
    <>
      Hue
      <input
        type="range"
        min="0"
        step="1"
        max="259"
        value={finetuneProps.hue ?? DEFAULT_VALUE.hue}
        onChange={changeValue}
        name="hue"
      />
      Saturation
      <input
        type="range"
        min="-2"
        step="0.5"
        max="10"
        value={finetuneProps.saturation ?? DEFAULT_VALUE.saturation}
        onChange={changeValue}
        name="saturation"
      />
      Value
      <input
        type="range"
        min="-2"
        step="0.1"
        max="2"
        value={finetuneProps.value ?? DEFAULT_VALUE.value}
        onChange={changeValue}
        name="value"
      />
    </>
  );
};

export default HSVOptions;

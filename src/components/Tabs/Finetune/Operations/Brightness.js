import React, { useContext, useState } from 'react';
import { fabric } from 'fabric';

import AppContext from '../../../../AppContext';
import { FintuneOperationWrapper } from './Operations.styled';

const Brightness = () => {
  const { canvas, canvasedImage } = useContext(AppContext);
  const [value, setValue] = useState(0);
  console.log(canvasedImage)
  console.log(canvasedImage.filters)

  const test = (e) => {
    setValue(e.target.value)
    canvasedImage.filters.push([
      new fabric.Image.filters.Contrast({
        contrast: e.target.value
      })
    ]
    )
    canvasedImage.applyFilters();
    canvas.renderAll();
  }

  return (
    <FintuneOperationWrapper>
      <input type="range" min="-1" max="1" value={value} onChange={test} />
    </FintuneOperationWrapper>
  );
}

export default Brightness;

import React from 'react';

import { PreviewRect } from './Shapes.styled';
import useCanvasShape from '../../../../../hooks/useCanvasShape';

const Rect = ({ defaultFill = 'red'}) => {
  const [currentShape] = useCanvasShape({ className: 'Rect', defaultFill });

  return (
    <>
      <div>Hello rect.!</div>
      {currentShape && <PreviewRect {...currentShape} />}
    </>
  )
}

export default Rect;

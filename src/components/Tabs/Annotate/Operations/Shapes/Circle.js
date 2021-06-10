import React from 'react';

import { PreviewCircle } from './Shapes.styled';
import useCanvasShape from '../../../../../hooks/useCanvasShape';

const Circle = ({ defaultFill = 'green'}) => {
  const [currentShape] = useCanvasShape({
    className: 'Circle',
    defaultFill,
    calcDimensionsProps: (width, height) => ({ radius: Math.max(width, height) })
  });

  return (
    <>
      <div>Hello Circle.!</div>
      {currentShape && <PreviewCircle {...currentShape} />}
    </>
  )
}

export default Circle;

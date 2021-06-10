import React from 'react';

import { PreviewPolygon } from './Shapes.styled';
import useCanvasShape from '../../../../../hooks/useCanvasShape';

const Polygon = ({ defaultFill = 'gray' }) => {
  const [currentShape] = useCanvasShape({
    className: 'RegularPolygon',
    defaultFill,
    sides: 3,
    calcDimensionsProps: (width, height) => ({ radius: Math.max(width, height) })
  });

  return (
    <>
      <div>Hello Polygon.!</div>
      {currentShape && <PreviewPolygon {...currentShape} />}
    </>
  )
}

export default Polygon;

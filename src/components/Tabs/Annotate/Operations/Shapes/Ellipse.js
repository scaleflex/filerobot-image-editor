import React from 'react';

import { PreviewEllipse } from './Shapes.styled';
import useCanvasShape from '../../../../../hooks/useCanvasShape';

const Ellipse = ({ defaultFill = 'blue'}) => {
  const [currentShape] = useCanvasShape({
    className: 'Ellipse',
    defaultFill,
    calcDimensionsProps: (width, height) => ({ radiusX: width, radiusY: height })
  });

  return (
    <>
      <div>Hello Ellipse.!</div>
      {currentShape && <PreviewEllipse {...currentShape} />}
    </>
  )
}

export default Ellipse;

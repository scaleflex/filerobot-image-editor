import React, { useContext } from 'react';

import Context from '../../../../context';
import useAnnotation from '../../../../hooks/useAnnotation';
import ShapesOptionsPopup from '../../../ShapesOptionsPopup';
import { SHAPES_NAMES } from '../../../../utils/constants';
import { AnnotateOperationsWrapper } from './Operations.styled';
import calcLineDimensionProps from './calcLineDimensionProps';

const Arrow = ({ defaultStrokeColor = '#000000', defaultStrokeSize = 3, defaultLineCap = 'butt' }) => {
  const { selections = [] } = useContext(Context);
  useAnnotation({
    libClassName: 'Arrow',
    name: SHAPES_NAMES.ARROW,
    calcDimensionsProps: calcLineDimensionProps,
    stroke: defaultStrokeColor,
    strokeWidth: defaultStrokeSize,
    lineCap: defaultLineCap,
    absoluteDimensions: false,
    dash: [10, 10],
    dashEnabled: false,
  });

  if (!selections[0]) { return ''; }

  return (
    <AnnotateOperationsWrapper>
      <ShapesOptionsPopup />
    </AnnotateOperationsWrapper>
  );
}

export default Arrow;

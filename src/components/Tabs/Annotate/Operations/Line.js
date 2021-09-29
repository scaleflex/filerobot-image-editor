import React, { useContext } from 'react';

import useAnnotation from '../../../../hooks/useAnnotation';
import ShapesOptionsPopup from '../../../ShapesOptionsPopup';
import { ANNOTATIONS_NAMES } from '../../../../utils/constants';
import { AnnotateOperationsWrapper } from './Operations.styled';
import calcLineDimensionProps from './calcLineDimensionProps';

const Line = ({ defaultStrokeColor = '#000000', defaultStrokeSize = 3, defaultLineCap = 'butt' }) => {
  return
  // const { selections = [] } = useContext(Context);
  // useAnnotation({
  //   libClassName: 'Line',
  //   name: ANNOTATIONS_NAMES.LINE,
  //   calcDimensionsProps: calcLineDimensionProps,
  //   stroke: defaultStrokeColor,
  //   strokeWidth: defaultStrokeSize,
  //   lineCap: defaultLineCap,
  //   absoluteDimensions: false,
  //   dash: [10, 10],
  //   dashEnabled: false,
  // });

  // if (!selections[0]) { return ''; }

  // return <ShapesOptionsPopup />;
};

export default Line;

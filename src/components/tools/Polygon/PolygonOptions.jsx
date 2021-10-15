/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { ANNOTATIONS_NAMES } from 'utils/constants';
import AnnotationOptions from 'components/common/AnnotationOptions';
import {
  polygonOptionsPopupComponents,
  POLYGON_POPPABLE_OPTIONS,
} from './Polygon.constants';

const PolygonOptions = () => {
  const [polygon, savePolygon] = useAnnotation({
    name: ANNOTATIONS_NAMES.POLYGON,
    sides: 3,
  });

  return (
    <AnnotationOptions
      morePoppableOptionsPrepended={POLYGON_POPPABLE_OPTIONS}
      moreOptionsPopupComponentsObj={polygonOptionsPopupComponents}
      annotation={polygon}
      updateAnnotation={savePolygon}
    />
  );
};

export default PolygonOptions;

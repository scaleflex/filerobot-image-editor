/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { TOOLS_IDS } from 'utils/constants';
import AnnotationOptions from 'components/common/AnnotationOptions';
import {
  polygonOptionsPopupComponents,
  POLYGON_POPPABLE_OPTIONS,
} from './Polygon.constants';

const PolygonOptions = ({ t }) => {
  const [polygon, savePolygon] = useAnnotation({
    name: TOOLS_IDS.POLYGON,
    sides: 3,
  });

  return (
    <AnnotationOptions
      morePoppableOptionsPrepended={POLYGON_POPPABLE_OPTIONS}
      moreOptionsPopupComponentsObj={polygonOptionsPopupComponents}
      annotation={polygon}
      updateAnnotation={savePolygon}
      t={t}
    />
  );
};

export default PolygonOptions;

/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

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
  });

  return (
    <AnnotationOptions
      className="FIE_polygon-tool-options"
      morePoppableOptionsPrepended={POLYGON_POPPABLE_OPTIONS}
      moreOptionsPopupComponentsObj={polygonOptionsPopupComponents}
      annotation={polygon}
      updateAnnotation={savePolygon}
      t={t}
      hidePositionField
    />
  );
};

PolygonOptions.propTypes = {
  t: PropTypes.func.isRequired,
};

export default PolygonOptions;

/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { TOOLS_IDS } from 'utils/constants';
import AnnotationOptions from 'components/common/AnnotationOptions';

const ArrowOptions = ({ t }) => {
  const [arrow, saveArrow] = useAnnotation({
    name: TOOLS_IDS.ARROW,
  });

  return (
    <AnnotationOptions
      className="FIE_arrow-tool-options"
      annotation={arrow}
      updateAnnotation={saveArrow}
      t={t}
      hidePositionField
      hideFillOption
    />
  );
};

ArrowOptions.propTypes = {
  t: PropTypes.func.isRequired,
};

export default ArrowOptions;

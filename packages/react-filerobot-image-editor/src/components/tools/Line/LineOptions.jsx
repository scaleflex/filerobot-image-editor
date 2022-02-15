/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { TOOLS_IDS } from 'utils/constants';
import AnnotationOptions from 'components/common/AnnotationOptions';

const LineOptions = ({ t }) => {
  const [line, saveLine] = useAnnotation({
    name: TOOLS_IDS.LINE,
  });

  return (
    <AnnotationOptions
      className="FIE_line-tool-options"
      annotation={line}
      updateAnnotation={saveLine}
      t={t}
      hidePositionField
      hideFillOption
    />
  );
};

LineOptions.propTypes = {
  t: PropTypes.func.isRequired,
};

export default LineOptions;

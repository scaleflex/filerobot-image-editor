/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { TOOLS_IDS } from 'utils/constants';
import AnnotationOptions from 'components/common/AnnotationOptions';

const ArrowOptions = () => {
  const [arrow, saveArrow] = useAnnotation({
    name: TOOLS_IDS.ARROW,
  });

  return (
    <AnnotationOptions
      annotation={arrow}
      updateAnnotation={saveArrow}
      hideFillOption
    />
  );
};

export default ArrowOptions;

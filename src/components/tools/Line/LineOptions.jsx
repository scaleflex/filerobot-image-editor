/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { TOOLS_IDS } from 'utils/constants';
import AnnotationOptions from 'components/common/AnnotationOptions';

const LineOptions = () => {
  const [line, saveLine] = useAnnotation({
    name: TOOLS_IDS.LINE,
  });

  return (
    <AnnotationOptions
      annotation={line}
      updateAnnotation={saveLine}
      hideFillOption
    />
  );
};

export default LineOptions;

/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { ANNOTATIONS_NAMES } from 'utils/constants';
import AnnotationOptions from 'components/common/AnnotationOptions';

const LineOptions = () => {
  const [line, saveLine] = useAnnotation({
    name: ANNOTATIONS_NAMES.LINE,
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

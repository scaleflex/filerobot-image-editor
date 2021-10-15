/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { ANNOTATIONS_NAMES } from 'utils/constants';
import AnnotationOptions from 'components/common/AnnotationOptions';

const ArrowOptions = () => {
  const [arrow, saveArrow] = useAnnotation({
    name: ANNOTATIONS_NAMES.ARROW,
  });

  return <AnnotationOptions annotation={arrow} updateAnnotation={saveArrow} />;
};

export default ArrowOptions;

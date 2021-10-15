/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { ANNOTATIONS_NAMES } from 'utils/constants';
import AnnotationOptions from 'components/common/AnnotationOptions';

const EllipseOptions = () => {
  const [ellipse, saveEllipse] = useAnnotation({
    name: ANNOTATIONS_NAMES.ELLIPSE,
  });

  return (
    <AnnotationOptions annotation={ellipse} updateAnnotation={saveEllipse} />
  );
};

export default EllipseOptions;

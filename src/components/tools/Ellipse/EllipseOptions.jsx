/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { TOOLS_IDS } from 'utils/constants';
import AnnotationOptions from 'components/common/AnnotationOptions';

const EllipseOptions = ({ t }) => {
  const [ellipse, saveEllipse] = useAnnotation({
    name: TOOLS_IDS.ELLIPSE,
  });

  return (
    <AnnotationOptions
      annotation={ellipse}
      updateAnnotation={saveEllipse}
      t={t}
    />
  );
};

export default EllipseOptions;

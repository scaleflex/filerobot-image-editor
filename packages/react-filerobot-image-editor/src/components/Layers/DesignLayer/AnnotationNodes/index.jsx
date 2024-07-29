/** External Dependencies */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useAnnotationEvents, useStore, useTextAnnotationEditing } from 'hooks';
import MemoizedAnnotation from './MemoizedAnnotation';

const AnnotationNodes = ({
  annotations,
  annotationNamesToNodeComponents,
  ...props
}) => {
  const { selectionsIds = [] } = useStore();
  const annotationEvents = useAnnotationEvents();
  useTextAnnotationEditing();

  return useMemo(
    () =>
      Object.values(annotations).map((annotation) => (
        <MemoizedAnnotation
          key={annotation.id}
          annotation={annotation}
          annotationEvents={annotationEvents}
          selectionsIds={selectionsIds}
          annotationNamesToNodeComponents={annotationNamesToNodeComponents}
          {...props}
        />
      )),
    [annotations, annotationEvents, selectionsIds],
  );
};

AnnotationNodes.propTypes = {
  annotations: PropTypes.instanceOf(Object).isRequired,
  annotationNamesToNodeComponents: PropTypes.instanceOf(Object).isRequired,
};

export default AnnotationNodes;

/** External Dependencies */
import React, { useContext, useMemo } from 'react';

/** Internal Dependencies */
import AppContext from 'context';
import { useAnnotationEvents } from 'hooks';
import { ANNOTATION_NAMES_TO_COMPONENT } from './AnnotationNodes.constants';

const AnnotationNodes = () => {
  const { annotations = {}, selectionsIds = [] } = useContext(AppContext);
  const annotationEvents = useAnnotationEvents();

  const renderAnnotation = (annotation) => {
    const AnnotationComponent = ANNOTATION_NAMES_TO_COMPONENT[annotation.name];

    return (
      <AnnotationComponent
        key={annotation.id}
        annotationEvents={annotationEvents}
        draggable={selectionsIds.includes(annotation.id)}
        {...annotation}
      />
    );
  };

  return useMemo(
    () => Object.values(annotations).map(renderAnnotation),
    [annotations, annotationEvents, selectionsIds],
  );
};

export default AnnotationNodes;

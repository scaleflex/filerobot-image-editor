/** External Dependencies */
import React, { useMemo } from 'react';

/** Internal Dependencies */
import { useAnnotationEvents, useStore, useTextAnnotationEditing } from 'hooks';
import MemoizedAnnotation from './MemoizedAnnotation';

const AnnotationNodes = () => {
  const { annotations = {}, selectionsIds = [] } = useStore();
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
        />
      )),
    [annotations, annotationEvents, selectionsIds],
  );
};

export default AnnotationNodes;

/** External Dependencies */
import React, { useContext, useMemo } from 'react';

/** Internal Dependencies */
import AppContext from 'context';
import { useAnnotationEvents } from 'hooks';
import MemoizedAnnotation from './MemoizedAnnotation';

const AnnotationNodes = () => {
  const { annotations = {}, selectionsIds = [] } = useContext(AppContext);
  const annotationEvents = useAnnotationEvents();

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

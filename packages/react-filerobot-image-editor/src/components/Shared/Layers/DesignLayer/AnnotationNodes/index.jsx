/** External Dependencies */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useAnnotationEvents, useStore } from 'hooks';
import MemoizedAnnotation from './MemoizedAnnotation';

const AnnotationNodes = ({
  annotationIds,
  annotations,
  annotationNamesToNodeComponents,
  ...props
}) => {
  const { selectionsIds = [] } = useStore();
  const annotationEvents = useAnnotationEvents();

  return useMemo(
    () =>
      annotationIds.map((annotationId) => (
        <MemoizedAnnotation
          key={annotationId}
          annotation={annotations[annotationId]}
          annotationEvents={annotationEvents}
          selectionsIds={selectionsIds}
          annotationNamesToNodeComponents={annotationNamesToNodeComponents}
          {...props}
        />
      )),
    [annotationIds, annotations, annotationEvents, selectionsIds],
  );
};

AnnotationNodes.propTypes = {
  annotationIds: PropTypes.instanceOf(Array).isRequired,
  annotations: PropTypes.instanceOf(Object).isRequired,
  annotationNamesToNodeComponents: PropTypes.instanceOf(Object).isRequired,
};

export default AnnotationNodes;

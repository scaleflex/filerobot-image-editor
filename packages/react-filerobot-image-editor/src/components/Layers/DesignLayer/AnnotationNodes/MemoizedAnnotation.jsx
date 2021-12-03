/** External Dependencies */
import React, { memo } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { ANNOTATION_NAMES_TO_COMPONENT } from './AnnotationNodes.constants';

const MemoizedAnnotation = ({
  annotation,
  annotationEvents,
  selectionsIds,
}) => {
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

MemoizedAnnotation.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  annotationEvents: PropTypes.instanceOf(Object).isRequired,
  selectionsIds: PropTypes.instanceOf(Object).isRequired,
};

export default memo(MemoizedAnnotation);

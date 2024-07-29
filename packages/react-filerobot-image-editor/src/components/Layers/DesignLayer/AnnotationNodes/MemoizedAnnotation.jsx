/** External Dependencies */
import React, { memo } from 'react';
import PropTypes from 'prop-types';

const MemoizedAnnotation = ({
  annotation,
  annotationEvents,
  selectionsIds,
  annotationNamesToNodeComponents,
  ...props
}) => {
  const AnnotationComponent =
    annotationNamesToNodeComponents?.[annotation?.name];
  if (!AnnotationComponent) return null;

  return (
    <AnnotationComponent
      key={annotation.id}
      annotationEvents={annotationEvents}
      draggable={selectionsIds.includes(annotation.id)}
      {...annotation}
      {...props}
    />
  );
};

MemoizedAnnotation.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  annotationEvents: PropTypes.instanceOf(Object).isRequired,
  selectionsIds: PropTypes.instanceOf(Object).isRequired,
  annotationNamesToNodeComponents: PropTypes.instanceOf(Object).isRequired,
};

export default memo(MemoizedAnnotation);

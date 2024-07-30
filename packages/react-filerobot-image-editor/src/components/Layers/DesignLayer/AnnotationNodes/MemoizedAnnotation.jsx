/** External Dependencies */
import React, { memo } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useMapDimensions } from 'hooks';

const MemoizedAnnotation = ({
  annotation,
  annotationEvents,
  selectionsIds,
  annotationNamesToNodeComponents,
  ...props
}) => {
  const { mapDimensionsToPreview } = useMapDimensions();
  const AnnotationComponent =
    annotationNamesToNodeComponents?.[annotation?.name];
  if (!AnnotationComponent) return null;

  const annotationWithMappedDimensions = {
    ...annotation,
    ...mapDimensionsToPreview(annotation),
  };

  return (
    <AnnotationComponent
      key={annotation.id}
      annotationEvents={annotationEvents}
      draggable={selectionsIds.includes(annotation.id)}
      {...annotationWithMappedDimensions}
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

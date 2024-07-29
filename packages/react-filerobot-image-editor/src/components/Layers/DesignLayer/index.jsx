/** External Dependencies */
import React, { useRef } from 'react';

/** Internal Dependencies */
import { useStore } from 'hooks';
import AnnotationNodes from './AnnotationNodes';
import PreviewGroup from './PreviewGroup';
import DesignLayerWrapper from './DesignLayerWrapper';
import { ANNOTATION_NAMES_TO_COMPONENT } from './AnnotationNodes/AnnotationNodes.constants';

const DesignLayer = () => {
  const { annotations } = useStore();
  const previewGroupRef = useRef();

  return (
    <DesignLayerWrapper previewGroupRef={previewGroupRef}>
      <AnnotationNodes
        annotations={annotations}
        annotationNamesToNodeComponents={ANNOTATION_NAMES_TO_COMPONENT}
      />
      <PreviewGroup ref={previewGroupRef} />
    </DesignLayerWrapper>
  );
};

export default DesignLayer;

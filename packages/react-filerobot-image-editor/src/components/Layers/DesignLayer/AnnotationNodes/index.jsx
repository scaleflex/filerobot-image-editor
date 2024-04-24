/** External Dependencies */
import React, { useMemo, useRef, useState, useEffect } from 'react';

/** Internal Dependencies */
import { TOOLS_IDS } from 'utils/constants';
import { useAnnotationEvents, useStore } from 'hooks';
import MemoizedAnnotation from './MemoizedAnnotation';

// calling code should fire a `SET_ANNOTATION` editor reducer event with this `payload.id`
const MAGIC_BLUR_ANNOTATION_ID = "BLUR_RECT";

const AnnotationNodes = () => {
  const {
    originalImage,
    shownImageDimensions,
    annotations = {}, selectionsIds = [],
  } = useStore();
  const allAnnotations = Object.values(annotations);

  const annotationEvents = useAnnotationEvents();

  const [clonedImg, setClonedImg] = useState();

  useEffect(() => {
    const img = document.createElement('img');
    img.src = originalImage.src;
    img.onload = () => setClonedImg(img);
  }, [originalImage]);

  // inject blurred background image to canvas when magic 'blur' annotation is active
  // if (allAnnotations.find(a => a.id === MAGIC_BLUR_ANNOTATION_ID) !== undefined) {
  // for testing in stock editor (above condition requires deep consumer component integration)
  if (allAnnotations.length && clonedImg) {
    allAnnotations.unshift({
      name: "Image",
      id: "image-blur",
      image: originalImage,
      x: 0,
      y: 0,
      width: shownImageDimensions.width,
      height: shownImageDimensions.height,
      filters: [Konva.Filters.Blur],
      blurRadius: 10,
      scaleX: 1,
      scaleY: 1,
      listening: false,
      draggable: false,
    });
  }

  return useMemo(
    () =>
      allAnnotations.map((annotation) => (
        <MemoizedAnnotation
          key={annotation.id}
          annotation={annotation}
          annotationEvents={annotationEvents}
          selectionsIds={selectionsIds}
        />
      )),
    [allAnnotations, annotationEvents, selectionsIds, clonedImg],
  );
};

export default AnnotationNodes;

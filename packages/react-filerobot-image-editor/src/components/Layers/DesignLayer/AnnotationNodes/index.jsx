/** External Dependencies */
import React, { useMemo } from 'react';

/** Internal Dependencies */
import { useAnnotationEvents, useStore } from 'hooks';
import MemoizedAnnotation from './MemoizedAnnotation';

// calling code should fire a `SET_ANNOTATION` editor reducer event with this `payload.id`
const MAGIC_BLUR_ANNOTATION_ID = "BLUR_RECT";

const AnnotationNodes = () => {
  const {
    originalImage,
    shownImageDimensions,
    annotations = {}, selectionsIds = [],
    finetunes = [],
    finetunesProps = {},
    filter = null,
  } = useStore();
  const allAnnotations = Object.values(annotations);

  const annotationEvents = useAnnotationEvents();

  const finetunesAndFilter = useMemo(
    () => (filter ? [...finetunes, filter] : finetunes),
    [finetunes, filter],
  );

  // inject blurred background image to canvas when magic 'blur' annotation is active
  // if (allAnnotations.find(a => a.id === MAGIC_BLUR_ANNOTATION_ID) !== undefined) {
  // for testing in stock editor (above condition requires deep consumer component integration)
  if (allAnnotations.length) {
    allAnnotations.unshift({
      name: "Image",
      id: "image-blur",
      image: originalImage,
      x: 0,
      y: 0,
      width: shownImageDimensions.width,
      height: shownImageDimensions.height,
      filters: [Konva.Filters.Blur].concat(...finetunesAndFilter),
      blurRadius: 10,
      scaleX: 1,
      scaleY: 1,
      listening: false,
      draggable: false,
      ...finetunesProps,
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
    [allAnnotations, annotationEvents, selectionsIds, finetunesAndFilter],
  );
};

export default AnnotationNodes;

/** Internal Dependencies */
import getPointerOffsetPositionBoundedToObject from 'utils/getPointerOffsetPositionBoundedToObject';
import getBoundingRectUnScaled from './getBoundingRectUnScaled';
import getNewAnnotationPreview from './getNewAnnotationPreview';

const pointerDown = {
  startedX: undefined,
  startedY: undefined,
  isOutOfCanvas: false,
};

const eventsOptions = {
  passive: true,
};

let shownAnnotationPreview = null;
let latestAnnotationProps = null;

const previewThenCallAnnotationAdding = (
  canvas,
  annotation,
  previewGroup,
  callbkAfterPreview,
) => {
  const getCanvasBoundingRect = () => canvas.content.getBoundingClientRect();

  const previewAnnotation = (preparedAnnotation) => {
    shownAnnotationPreview = getNewAnnotationPreview(preparedAnnotation);
    previewGroup.add(shownAnnotationPreview);
    latestAnnotationProps = preparedAnnotation;
  };

  const updateAnnotationPreview = (preparedBoundingRect) => {
    shownAnnotationPreview.setAttrs(preparedBoundingRect);
    latestAnnotationProps = {
      ...latestAnnotationProps,
      ...preparedBoundingRect,
    };
  };

  const updatePreviewWithBoundedDimens = (e) => {
    const pointerOffsets = getPointerOffsetPositionBoundedToObject(
      e,
      getCanvasBoundingRect(),
    );
    updateAnnotationPreview(
      getBoundingRectUnScaled(
        pointerOffsets,
        pointerDown,
        canvas,
        previewGroup,
      ),
    );
  };

  const destroyLatestShownPreview = () => {
    if (shownAnnotationPreview) {
      shownAnnotationPreview.destroy();
    }
  };

  const handlePointerMove = (e) => {
    const pointerOffsets = getPointerOffsetPositionBoundedToObject(
      e,
      getCanvasBoundingRect(),
    );

    if (pointerDown.isOutOfCanvas) {
      document.removeEventListener(
        'mousemove',
        updatePreviewWithBoundedDimens,
        eventsOptions,
      );
      document.removeEventListener(
        'touchmove',
        updatePreviewWithBoundedDimens,
        eventsOptions,
      );
      pointerDown.isOutOfCanvas = false;
    }

    const boundingRect = getBoundingRectUnScaled(
      pointerOffsets,
      pointerDown,
      canvas,
      previewGroup,
    );
    if (shownAnnotationPreview) {
      updateAnnotationPreview(boundingRect);
    } else {
      previewAnnotation({
        ...annotation,
        ...boundingRect,
      });
    }
  };

  const handlePointerOut = () => {
    // if (!noDimensionsMapping && !pointerDown.isOutOfCanvas) {
    if (!pointerDown.isOutOfCanvas) {
      document.addEventListener(
        'mousemove',
        updatePreviewWithBoundedDimens,
        eventsOptions,
      );
      document.addEventListener(
        'touchmove',
        updatePreviewWithBoundedDimens,
        eventsOptions,
      );
      pointerDown.isOutOfCanvas = true;
    }
  };

  const handlePointerUp = () => {
    destroyLatestShownPreview();

    if (latestAnnotationProps) {
      callbkAfterPreview(latestAnnotationProps);
    }

    shownAnnotationPreview = null;
    latestAnnotationProps = null;

    canvas.off('mousemove touchmove', handlePointerMove);
    canvas.off('mouseout touchcancel', handlePointerOut);
    document.removeEventListener('mouseup', handlePointerUp, eventsOptions);
    document.removeEventListener('touchend', handlePointerUp, eventsOptions);
    document.removeEventListener('mouseleave', handlePointerUp, eventsOptions);
    document.removeEventListener('touchcancel', handlePointerUp, eventsOptions);
    document.removeEventListener(
      'mousemove',
      updatePreviewWithBoundedDimens,
      eventsOptions,
    );
    document.removeEventListener(
      'touchmove',
      updatePreviewWithBoundedDimens,
      eventsOptions,
    );
    pointerDown.isOutOfCanvas = false;
  };

  const handlePointerDown = (e) => {
    destroyLatestShownPreview();
    const pointerOffsets = getPointerOffsetPositionBoundedToObject(
      e,
      getCanvasBoundingRect(),
    );
    // The dimensions are relative to the canvas.
    pointerDown.startedX = pointerOffsets.offsetX;
    pointerDown.startedY = pointerOffsets.offsetY;
    pointerDown.isOutOfCanvas = false;

    canvas.on('mousemove touchmove', handlePointerMove);
    canvas.on('mouseout touchcancel', handlePointerOut);
    document.addEventListener('mouseup', handlePointerUp, eventsOptions);
    document.addEventListener('touchend', handlePointerUp, eventsOptions);
    document.addEventListener('mouseleave', handlePointerUp, eventsOptions);
    document.addEventListener('touchcancel', handlePointerUp, eventsOptions);
  };

  canvas.on('mousedown touchstart', handlePointerDown);

  return () => {
    destroyLatestShownPreview();
    canvas.off('mousedown touchstart', handlePointerDown);
  };
};

export default previewThenCallAnnotationAdding;

/** Internal Dependencies */
import { TOOLS_IDS } from 'utils/constants';
import getElemDocumentCoords from 'utils/getElemDocumentCoords';
import getPointerOffsetPositionBoundedToObject from 'utils/getPointerOffsetPositionBoundedToObject';
import getBoundingRectUnScaled from './getBoundingRectUnScaled';
import getNewAnnotationPreview, {
  dimensToProperAnnotationDimens,
  NO_WIDTH_HEIGHT_ANNOTATIONS,
} from './getNewAnnotationPreview';

const pointerDown = {
  startedX: undefined,
  startedY: undefined,
  isOutOfCanvas: false,
};

const eventsOptions = {
  passive: true,
};

const MIN_PIXELS = 1;

let shownAnnotationPreview = null;
let textAnnotationWrappedRect = null;
let latestAnnotationProps = null;

const previewThenCallAnnotationAdding = (
  canvas,
  annotation,
  previewGroup,
  callbkAfterPreview,
) => {
  const getCanvasBoundingRect = () => getElemDocumentCoords(canvas.content);

  const wrapTextBoundsPreviewByRect = (textAnnotation) => {
    textAnnotationWrappedRect = getNewAnnotationPreview({
      ...textAnnotation,
      name: TOOLS_IDS.RECT,
      fill: '',
      stroke: '#000000',
      strokeWidth: 2,
      shadowColor: '#ffffff',
      shadowBlur: 1,
      shadowOpacity: 0.7,
    });
    previewGroup.add(textAnnotationWrappedRect);
  };

  const previewAnnotation = (preparedAnnotation) => {
    shownAnnotationPreview = getNewAnnotationPreview(preparedAnnotation);
    previewGroup.add(shownAnnotationPreview);
    if (preparedAnnotation.name === TOOLS_IDS.TEXT) {
      wrapTextBoundsPreviewByRect(preparedAnnotation);
    }
    latestAnnotationProps = preparedAnnotation;
  };

  const updateAnnotationPreview = (preparedBoundingRect, isShiftKeyPressed) => {
    const transformedAnnotation = dimensToProperAnnotationDimens(
      preparedBoundingRect,
      latestAnnotationProps.name,
      isShiftKeyPressed,
    );
    if (textAnnotationWrappedRect) {
      textAnnotationWrappedRect.setAttrs(transformedAnnotation);
    }
    shownAnnotationPreview.setAttrs(transformedAnnotation);
    latestAnnotationProps = {
      ...latestAnnotationProps,
      ...transformedAnnotation,
    };
  };

  const updatePreviewWithBoundedDimens = (e) => {
    const pointerOffsets = getPointerOffsetPositionBoundedToObject(
      previewGroup,
      getCanvasBoundingRect(),
    );

    updateAnnotationPreview(
      getBoundingRectUnScaled(pointerOffsets, pointerDown, previewGroup),
      e.shiftKey,
    );
  };

  const destroyShownPreview = () => {
    if (previewGroup && shownAnnotationPreview) {
      previewGroup.destroyChildren();
    }
  };

  const handlePointerMove = (e) => {
    if (e.evt.touches?.length > 1) {
      return;
    }
    const pointerOffsets = getPointerOffsetPositionBoundedToObject(
      previewGroup,
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
      previewGroup,
    );
    if (shownAnnotationPreview) {
      updateAnnotationPreview(boundingRect, e.evt.shiftKey);
    } else {
      const { id, x, y, points, ...currentAnnotationProps } = annotation;
      previewAnnotation({
        ...currentAnnotationProps,
        ...boundingRect,
      });
    }
  };

  const handlePointerOut = () => {
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
    destroyShownPreview();
    if (
      latestAnnotationProps &&
      ((latestAnnotationProps.width >= MIN_PIXELS &&
        latestAnnotationProps.height >= MIN_PIXELS) ||
        (latestAnnotationProps.radiusX >= MIN_PIXELS &&
          latestAnnotationProps.radiusY >= MIN_PIXELS) ||
        latestAnnotationProps.points?.[2] ||
        latestAnnotationProps.points?.[3] ||
        latestAnnotationProps.radius >= MIN_PIXELS)
    ) {
      const {
        startedX,
        startedY,
        offsetX,
        offsetY,
        width,
        height,
        ...savableAnnotation
      } = latestAnnotationProps;
      if (!NO_WIDTH_HEIGHT_ANNOTATIONS.includes(annotation.name)) {
        savableAnnotation.width = width;
        savableAnnotation.height = height;
      }
      callbkAfterPreview(savableAnnotation, true);
    }

    shownAnnotationPreview = null;
    textAnnotationWrappedRect = null;
    latestAnnotationProps = null;

    canvas.off('mousemove touchmove', handlePointerMove);
    canvas.off('mouseleave touchcancel', handlePointerOut);
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
    e.evt.preventDefault();
    // if the canvas is in panning/dragging mode avoid drawing or if in zooming mode by touches avoid drawing.
    if (e.target.attrs.draggable || e.evt.touches?.length > 1) {
      return;
    }
    destroyShownPreview();
    const pointerOffsets = getPointerOffsetPositionBoundedToObject(
      previewGroup,
      getCanvasBoundingRect(),
    );

    // The dimensions are relative to the canvas.
    pointerDown.startedX = pointerOffsets.offsetX;
    pointerDown.startedY = pointerOffsets.offsetY;
    pointerDown.isOutOfCanvas = false;

    canvas.on('mousemove touchmove', handlePointerMove);
    canvas.on('mouseleave touchcancel', handlePointerOut);
    document.addEventListener('mouseup', handlePointerUp, eventsOptions);
    document.addEventListener('touchend', handlePointerUp, eventsOptions);
    document.addEventListener('mouseleave', handlePointerUp, eventsOptions);
    document.addEventListener('touchcancel', handlePointerUp, eventsOptions);
  };

  canvas.on('mousedown touchstart', handlePointerDown);

  return () => {
    destroyShownPreview();
    canvas.off('mousedown touchstart', handlePointerDown);
  };
};

export default previewThenCallAnnotationAdding;

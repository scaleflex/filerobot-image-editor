/** External Dependencies */
import Konva from 'konva';

/** Internal Dependencies */
import { ANNOTATIONS_NAMES } from 'utils/constants';

const annotationsNamesToKonvaClasses = {
  [ANNOTATIONS_NAMES.RECT]: Konva.Rect,
  [ANNOTATIONS_NAMES.ELLIPSE]: Konva.Ellipse,
  [ANNOTATIONS_NAMES.POLYGON]: Konva.RegularPolygon,
  [ANNOTATIONS_NAMES.LINE]: Konva.Line,
  [ANNOTATIONS_NAMES.IMAGE]: Konva.Image,
  [ANNOTATIONS_NAMES.TEXT]: Konva.Text,
  [ANNOTATIONS_NAMES.ARROW]: Konva.Arrow,
};

const ANNOTATIONS_WITH_POINTS = [
  ANNOTATIONS_NAMES.LINE,
  ANNOTATIONS_NAMES.ARROW,
];

export const NO_WIDTH_HEIGHT_ANNOTATIONS = [
  ...ANNOTATIONS_WITH_POINTS,
  ANNOTATIONS_NAMES.ELLIPSE,
  ANNOTATIONS_NAMES.POLYGON,
];

const getNewAnnotationPreview = (annotation) =>
  new annotationsNamesToKonvaClasses[annotation.name]({
    ...annotation,
    opacity: annotation.opacity ?? 0.7,
    x: annotation.x ?? 0,
    y: annotation.y ?? 0,
    width: Math.abs(annotation.width) || 0,
    height: Math.abs(annotation.height) || 0,
    ...(ANNOTATIONS_WITH_POINTS.includes(annotation.name)
      ? { stroke: annotation.stroke || '#000000' }
      : {}),
  });

// If we are changing width/height we have to update the X/Y for avoiding moving the annotation from current place.
export const dimensToProperAnnotationDimens = (
  currentDimensions,
  annotationName,
  isShiftKeyPressed,
) => {
  const { width, height, startedX, startedY, ...newAnnotationDimens } =
    currentDimensions;
  const absWidth = Math.abs(width);
  const absHeight = Math.abs(height);
  const isReversedX = width < 0;
  const isReversedY = height < 0;

  switch (annotationName) {
    case ANNOTATIONS_NAMES.RECT:
      if (isShiftKeyPressed) {
        newAnnotationDimens.width = Math.sqrt(
          absWidth * absWidth + absHeight * absHeight,
        );
        newAnnotationDimens.height = newAnnotationDimens.width;
        newAnnotationDimens.x -= isReversedX
          ? newAnnotationDimens.width - absWidth
          : 0;
        newAnnotationDimens.y -= isReversedY
          ? newAnnotationDimens.height - absHeight
          : 0;
      } else {
        newAnnotationDimens.width = absWidth;
        newAnnotationDimens.height = absHeight;
      }
      break;
    case ANNOTATIONS_NAMES.ELLIPSE:
      if (isShiftKeyPressed) {
        newAnnotationDimens.radiusX =
          Math.sqrt(absWidth * absWidth + absHeight * absHeight) / 2;
        newAnnotationDimens.radiusY = newAnnotationDimens.radiusX;
        newAnnotationDimens.x -= isReversedX
          ? newAnnotationDimens.radiusX * 2 - absWidth
          : 0;
        newAnnotationDimens.y -= isReversedY
          ? newAnnotationDimens.radiusY * 2 - absHeight
          : 0;
      } else {
        newAnnotationDimens.radiusX = absWidth / 2;
        newAnnotationDimens.radiusY = absHeight / 2;
      }

      newAnnotationDimens.offsetX = -newAnnotationDimens.radiusX;
      newAnnotationDimens.offsetY = -newAnnotationDimens.radiusY;
      break;
    case ANNOTATIONS_NAMES.POLYGON:
      newAnnotationDimens.radius = (absWidth + absHeight) / 2;
      newAnnotationDimens.x -= isReversedX
        ? newAnnotationDimens.radius * 2 - absWidth
        : 0;
      newAnnotationDimens.y -= isReversedY
        ? newAnnotationDimens.radius * 2 - absHeight
        : 0;
      newAnnotationDimens.offsetX = -newAnnotationDimens.radius;
      newAnnotationDimens.offsetY = -newAnnotationDimens.radius;
      break;
    case ANNOTATIONS_NAMES.LINE:
    case ANNOTATIONS_NAMES.ARROW:
      newAnnotationDimens.x = startedX;
      newAnnotationDimens.y = startedY;
      newAnnotationDimens.points = [0, 0];

      if (isShiftKeyPressed) {
        newAnnotationDimens.points.push(
          absWidth >= absHeight ? width : 0,
          absHeight > absWidth ? height : 0,
        );
      } else {
        newAnnotationDimens.points = [0, 0, width, height];
      }
      break;
    default:
      newAnnotationDimens.width = absWidth;
      newAnnotationDimens.height = absHeight;
      break;
  }

  return newAnnotationDimens;
};

export default getNewAnnotationPreview;

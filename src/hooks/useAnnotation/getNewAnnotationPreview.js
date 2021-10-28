/** External Dependencies */
import Konva from 'konva';

/** Internal Dependencies */
import { TOOLS_IDS } from 'utils/constants';

const annotationsNamesToKonvaClasses = {
  [TOOLS_IDS.RECT]: Konva.Rect,
  [TOOLS_IDS.ELLIPSE]: Konva.Ellipse,
  [TOOLS_IDS.POLYGON]: Konva.RegularPolygon,
  [TOOLS_IDS.LINE]: Konva.Line,
  [TOOLS_IDS.IMAGE]: Konva.Image,
  [TOOLS_IDS.TEXT]: Konva.Text,
  [TOOLS_IDS.ARROW]: Konva.Arrow,
};

const ANNOTATIONS_WITH_POINTS = [TOOLS_IDS.LINE, TOOLS_IDS.ARROW];

export const NO_WIDTH_HEIGHT_ANNOTATIONS = [
  ...ANNOTATIONS_WITH_POINTS,
  TOOLS_IDS.ELLIPSE,
  TOOLS_IDS.POLYGON,
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
    case TOOLS_IDS.RECT:
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
    case TOOLS_IDS.ELLIPSE:
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
    case TOOLS_IDS.POLYGON:
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
    case TOOLS_IDS.LINE:
    case TOOLS_IDS.ARROW:
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

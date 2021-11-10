/** Internal Dependencies */
import { POSITIONS } from './constants';
import getAnnotationOffsetToTopLeft from './getAnnotationOffsetToTopLeft';
import getSizeAfterRotation from './getSizeAfterRotation';

const mapPositionStringToPoint = (annotation, designLayer, position) => {
  const {
    width,
    height,
    scaleX = 1,
    scaleY = 1,
    rotation = 0,
    padding = 0,
  } = annotation;
  const scaledRotatedAnnotationSize = getSizeAfterRotation(
    width * scaleX,
    height * scaleY,
    rotation,
  );
  const { clipWidth: designLayerWidth, clipHeight: designLayerHeight } =
    designLayer.attrs;
  const annotationOffsetFromItsTopLeft =
    getAnnotationOffsetToTopLeft(annotation);

  const xAxisMapping = {
    left:
      annotationOffsetFromItsTopLeft +
      scaledRotatedAnnotationSize.offsetLeft +
      padding,
    center:
      designLayerWidth / 2 -
      (scaledRotatedAnnotationSize.width / 2 -
        annotationOffsetFromItsTopLeft -
        scaledRotatedAnnotationSize.offsetLeft) +
      padding,
    right:
      designLayerWidth -
      scaledRotatedAnnotationSize.width -
      padding -
      annotationOffsetFromItsTopLeft +
      scaledRotatedAnnotationSize.offsetLeft,
  };

  const yAxisMapping = {
    top:
      annotationOffsetFromItsTopLeft +
      scaledRotatedAnnotationSize.offsetTop +
      padding,
    middle:
      designLayerHeight / 2 -
      (scaledRotatedAnnotationSize.height / 2 -
        annotationOffsetFromItsTopLeft -
        scaledRotatedAnnotationSize.offsetTop) +
      padding,
    bottom:
      designLayerHeight -
      scaledRotatedAnnotationSize.height -
      padding -
      annotationOffsetFromItsTopLeft +
      scaledRotatedAnnotationSize.offsetTop,
  };

  const mapStringToPoint = {
    [POSITIONS.TOP_LEFT]: () => ({ x: xAxisMapping.left, y: yAxisMapping.top }),
    [POSITIONS.TOP_CENTER]: () => ({
      x: xAxisMapping.center,
      y: yAxisMapping.top,
    }),
    [POSITIONS.TOP_RIGHT]: () => ({
      x: xAxisMapping.right,
      y: yAxisMapping.top,
    }),
    [POSITIONS.MIDDLE_LEFT]: () => ({
      x: xAxisMapping.left,
      y: yAxisMapping.middle,
    }),
    [POSITIONS.MIDDLE_CENTER]: () => ({
      x: xAxisMapping.center,
      y: yAxisMapping.middle,
    }),
    [POSITIONS.MIDDLE_RIGHT]: () => ({
      x: xAxisMapping.right,
      y: yAxisMapping.middle,
    }),
    [POSITIONS.BOTTOM_LEFT]: () => ({
      x: xAxisMapping.left,
      y: yAxisMapping.bottom,
    }),
    [POSITIONS.BOTTOM_CENTER]: () => ({
      x: xAxisMapping.center,
      y: yAxisMapping.bottom,
    }),
    [POSITIONS.BOTTOM_RIGHT]: () => ({
      x: xAxisMapping.right,
      y: yAxisMapping.bottom,
    }),
  };

  return mapStringToPoint[position]();
};

export default mapPositionStringToPoint;

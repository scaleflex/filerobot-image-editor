/** Internal Dependencies */
import { POSITIONS } from './constants';
import getSizeAfterRotation from './getSizeAfterRotation';

const mapPositionStringToPoint = (annotation, designLayer, position) => {
  const {
    width,
    height,
    scaleX = 1,
    scaleY = 1,
    rotation = 0,
    padding = 0,
    radius,
    radiusX,
    radiusY,
  } = annotation;
  const annotationWidth = width || (radius || radiusX) * 2;
  const annotationHeight = height || (radius || radiusY) * 2;
  const scaledRotatedAnnotationSize = getSizeAfterRotation(
    annotationWidth * scaleX,
    annotationHeight * scaleY,
    rotation,
  );
  const { clipWidth: designLayerWidth, clipHeight: designLayerHeight } =
    designLayer.attrs;

  const xAxisMapping = {
    left: scaledRotatedAnnotationSize.offsetLeft + padding,
    center:
      designLayerWidth / 2 -
      (scaledRotatedAnnotationSize.width / 2 -
        scaledRotatedAnnotationSize.offsetLeft) +
      padding,
    right:
      designLayerWidth -
      scaledRotatedAnnotationSize.width -
      padding +
      scaledRotatedAnnotationSize.offsetLeft,
  };

  const yAxisMapping = {
    top: scaledRotatedAnnotationSize.offsetTop + padding,
    middle:
      designLayerHeight / 2 -
      (scaledRotatedAnnotationSize.height / 2 -
        scaledRotatedAnnotationSize.offsetTop) +
      padding,
    bottom:
      designLayerHeight -
      scaledRotatedAnnotationSize.height -
      padding +
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

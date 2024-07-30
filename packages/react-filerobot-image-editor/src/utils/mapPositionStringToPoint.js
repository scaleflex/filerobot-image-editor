/** Internal Dependencies */
import { POSITIONS } from './constants';
import getSizeAfterRotation from './getSizeAfterRotation';

const mapPositionStringToPoint = (
  annotation,
  designLayer,
  position,
  mapToPreviewDimensionsFn,
) => {
  const {
    width,
    height,
    scaleX = 1,
    scaleY = 1,
    rotation = 0,
    padding = 0,
    radiusX,
    radiusY,
  } = annotation;
  const dimensions = {
    width: width || radiusX * 2,
    height: height || radiusY * 2,
  };

  const { width: annotationWidth, height: annotationHeight } =
    typeof mapToPreviewDimensionsFn === 'function'
      ? mapToPreviewDimensionsFn(dimensions)
      : dimensions;

  const scaledRotatedAnnotationSize = getSizeAfterRotation(
    annotationWidth * scaleX,
    annotationHeight * scaleY,
    rotation,
  );
  const {
    clipWidth: designLayerWidth,
    clipHeight: designLayerHeight,
    clipX: designLayerX = 0,
    clipY: designLayerY = 0,
  } = designLayer.attrs;

  const xAxisMapping = {
    left: designLayerX + scaledRotatedAnnotationSize.offsetLeft + padding,
    center:
      designLayerX +
      designLayerWidth / 2 -
      (scaledRotatedAnnotationSize.width / 2 -
        scaledRotatedAnnotationSize.offsetLeft) +
      padding,
    right:
      designLayerX +
      designLayerWidth -
      scaledRotatedAnnotationSize.width -
      padding +
      scaledRotatedAnnotationSize.offsetLeft,
  };

  const yAxisMapping = {
    top: designLayerY + scaledRotatedAnnotationSize.offsetTop + padding,
    middle:
      designLayerY +
      designLayerHeight / 2 -
      (scaledRotatedAnnotationSize.height / 2 -
        scaledRotatedAnnotationSize.offsetTop) +
      padding,
    bottom:
      designLayerY +
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

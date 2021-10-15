/** Internal Dependencies */
import { POSITIONS } from './constants';
import getAnnotationOffsetToTopLeft from './getAnnotationOffsetToTopLeft';

const mapPositionStringToPoint = (annotation, designLayer, position) => {
  const { width, height } = annotation;
  const { width: designLayerWidth, height: designLayerHeight } = designLayer;
  const annotationOffsetFromItsTopLeft =
    getAnnotationOffsetToTopLeft(annotation);

  const xAxisMapping = {
    left: annotationOffsetFromItsTopLeft,
    center: designLayerWidth / 2 - (width / 2 - annotationOffsetFromItsTopLeft),
    right: designLayerWidth - width - annotationOffsetFromItsTopLeft,
  };

  const yAxisMapping = {
    top: annotationOffsetFromItsTopLeft,
    middle:
      designLayerHeight / 2 - (height / 2 - annotationOffsetFromItsTopLeft),
    bottom: designLayerHeight - height - annotationOffsetFromItsTopLeft,
  };

  const mapStringToPoint = {
    [POSITIONS.TOP_LEFT]: { x: xAxisMapping.left, y: yAxisMapping.top },
    [POSITIONS.TOP_CENTER]: { x: xAxisMapping.center, y: yAxisMapping.top },
    [POSITIONS.TOP_RIGHT]: { x: xAxisMapping.right, y: yAxisMapping.top },
    [POSITIONS.MIDDLE_LEFT]: { x: xAxisMapping.left, y: yAxisMapping.middle },
    [POSITIONS.MIDDLE_CENTER]: {
      x: xAxisMapping.center,
      y: yAxisMapping.middle,
    },
    [POSITIONS.MIDDLE_RIGHT]: { x: xAxisMapping.right, y: yAxisMapping.middle },
    [POSITIONS.BOTTOM_LEFT]: { x: xAxisMapping.left, y: yAxisMapping.bottom },
    [POSITIONS.BOTTOM_CENTER]: {
      x: xAxisMapping.center,
      y: yAxisMapping.bottom,
    },
    [POSITIONS.BOTTOM_RIGHT]: { x: xAxisMapping.right, y: yAxisMapping.bottom },
  };

  return mapStringToPoint[position];
};

export default mapPositionStringToPoint;

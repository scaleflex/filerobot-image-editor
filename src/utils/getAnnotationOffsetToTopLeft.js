const { ANNOTATIONS_NAMES } = require('./constants');

const getAnnotationOffsetToTopLeft = (annotation) => {
  switch (annotation.name) {
    case ANNOTATIONS_NAMES.ELLIPSE:
    case ANNOTATIONS_NAMES.POLYGON:
      return annotation.width / 2;
    case ANNOTATIONS_NAMES.ARROW:
    case ANNOTATIONS_NAMES.LINE:
      return -Math.min(annotation.points[0], annotation.points[2]);
    default:
      return 0;
  }
};

export default getAnnotationOffsetToTopLeft;

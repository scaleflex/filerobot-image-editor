const { TOOLS_IDS } = require('./constants');

const getAnnotationOffsetToTopLeft = (annotation) => {
  switch (annotation.name) {
    case TOOLS_IDS.ELLIPSE:
    case TOOLS_IDS.POLYGON:
      return annotation.width / 2;
    case TOOLS_IDS.ARROW:
    case TOOLS_IDS.LINE:
      return -Math.min(annotation.points[0], annotation.points[2]);
    default:
      return 0;
  }
};

export default getAnnotationOffsetToTopLeft;

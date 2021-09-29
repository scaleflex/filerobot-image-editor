import { ANNOTATIONS_NAMES } from '../../utils/constants';

// TODO: Consider rotation angle in aligning.
export const getAlignmentBaseValX = (shape) => {
  switch (shape.name()) {
    case ANNOTATIONS_NAMES.CIRCLE:
    case ANNOTATIONS_NAMES.ELLIPSE:
    case ANNOTATIONS_NAMES.POLYGON:
      return shape.width() / 2;
    case ANNOTATIONS_NAMES.ARROW:
    case ANNOTATIONS_NAMES.LINE:
      const points = shape.points();
      return -(Math.min(points[0], points[2]));
    default:
      return 0;
  }
};

export const getAlignmentBaseValY = (shape) => {
  switch (shape.name()) {
    case ANNOTATIONS_NAMES.CIRCLE:
    case ANNOTATIONS_NAMES.ELLIPSE:
    case ANNOTATIONS_NAMES.POLYGON:
      return shape.height() / 2;
    case ANNOTATIONS_NAMES.ARROW:
    case ANNOTATIONS_NAMES.LINE:
      const points = shape.points();
      return -(Math.min(points[1], points[points.length - 1]));
    default:
      return 0;
  }
};

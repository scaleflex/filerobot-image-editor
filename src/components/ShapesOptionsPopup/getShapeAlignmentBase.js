import { SHAPES_NAMES } from '../../utils/constants';

// TODO: Consider rotation angle in aligning.
export const getAlignmentBaseValX = (shape) => {
  switch (shape.name()) {
    case SHAPES_NAMES.CIRCLE:
    case SHAPES_NAMES.ELLIPSE:
    case SHAPES_NAMES.POLYGON:
      return shape.width() / 2;
    case SHAPES_NAMES.ARROW:
    case SHAPES_NAMES.LINE:
      const points = shape.points();
      return -(Math.min(points[0], points[2]));
    default:
      return 0;
  }
};

export const getAlignmentBaseValY = (shape) => {
  switch (shape.name()) {
    case SHAPES_NAMES.CIRCLE:
    case SHAPES_NAMES.ELLIPSE:
    case SHAPES_NAMES.POLYGON:
      return shape.height() / 2;
    case SHAPES_NAMES.ARROW:
    case SHAPES_NAMES.LINE:
      const points = shape.points();
      return -(Math.min(points[1], points[points.length - 1]));
    default:
      return 0;
  }
};

import randomId from '../../../../../utils/randomId';
import { SHAPES_NAMES } from '../../../../../utils/constants';

const getShapeDefaultState = (shapeObject) => {
  const state = {
    draw: false,
    id: randomId(shapeObject.name),
    name: shapeObject.name,
    libClassName: shapeObject.libClassName,
  };

  switch (shapeObject.name) {
    case SHAPES_NAMES.CIRCLE:
      state.calcDimensionsProps = ({ width, height }) => ({ radius: Math.max(width, height) });
      break;
    case SHAPES_NAMES.ELLIPSE:
      state.calcDimensionsProps = ({ width, height }) => ({ radiusX: width, radiusY: height });
      break;
    case SHAPES_NAMES.POLYGON:
      state.sides = 3;
      state.calcDimensionsProps = ({ width, height }) => ({ radius: Math.max(width, height) });
      break;
    default:
      break;
  }

  return state;
};

export default getShapeDefaultState;

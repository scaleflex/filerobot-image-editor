import randomId from '../../../../../utils/randomId';
import { AVAILABLE_ANNOTATIONS_NAMES } from '../../OptionsPopup/OptionsPopup.constants';

const getShapeDefaultState = (shapeObject) => {
  const state = {
    draw: false,
    id: randomId(shapeObject.name),
    name: shapeObject.name,
    libClassName: shapeObject.libClassName,
  }

  switch (shapeObject.name) {
    case AVAILABLE_ANNOTATIONS_NAMES.CIRCLE:
      state.calcDimensionsProps = ({ width, height }) => ({ radius: Math.max(width, height) });
      break;
    case AVAILABLE_ANNOTATIONS_NAMES.ELLIPSE:
      state.calcDimensionsProps = ({ width, height }) => ({ radiusX: width, radiusY: height });
      break;
    case AVAILABLE_ANNOTATIONS_NAMES.POLYGON:
      state.sides = 3;
      state.calcDimensionsProps = ({ width, height }) => ({ radius: Math.max(width, height) });
      break;
    default:
      break;
  }

  return state;
}

export default getShapeDefaultState;

/** Internal Dependencies */
import { POSITIONS } from 'utils/constants';

export const AVAILABLE_POSITIONS = Object.values(POSITIONS);

export const posCssRotateDegFromRightSide = {
  [POSITIONS.TOP_LEFT]: -145,
  [POSITIONS.TOP_CENTER]: -90,
  [POSITIONS.TOP_RIGHT]: -45,
  [POSITIONS.MIDDLE_LEFT]: 180,
  [POSITIONS.MIDDLE_CENTER]: 0,
  [POSITIONS.MIDDLE_RIGHT]: 0,
  [POSITIONS.BOTTOM_LEFT]: 135,
  [POSITIONS.BOTTOM_CENTER]: 90,
  [POSITIONS.BOTTOM_RIGHT]: 45,
};

export const POPPABLE_OPTIONS = {
  OPACITY: 'opacity',
  STROKE: 'stroke',
  SHADOW: 'shadow',
  POSITION: 'position',
};

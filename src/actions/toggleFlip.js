/** Internal Dependencies */
import { FLIP_DIRECTIONS } from 'utils/constants';

export const TOGGLE_FLIP = 'TOGGLE_FLIP';

const toggleFlip = (state, payload) => {
  const flipProperty = `isFlipped${
    payload.direction === FLIP_DIRECTIONS.X ? 'X' : 'Y'
  }`;

  return {
    ...state,
    isDesignState: !payload.dismissHistory,
    adjustments: {
      ...state.adjustments,
      [flipProperty]: !state.adjustments[flipProperty],
    },
  };
};

export default toggleFlip;

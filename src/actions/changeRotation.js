export const CHANGE_ROTATION = 'CHANGE_ROTATION';

const changeRotation = (state, payload) =>
  state.adjustments.rotation !== payload.rotation
    ? {
        ...state,
        isDesignState: !payload.dismissHistory,
        adjustments: {
          ...state.adjustments,
          rotation: payload.rotation,
        },
      }
    : state;

export default changeRotation;

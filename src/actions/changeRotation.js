export const CHANGE_ROTATION = 'CHANGE_ROTATION';

const changeRotation = (state, payload) =>
  state.adjustments.rotation !== payload.rotation
    ? {
        ...state,
        isDesignState: true,
        adjustments: {
          ...state.adjustments,
          rotation: payload.rotation,
        },
      }
    : state;

export default changeRotation;

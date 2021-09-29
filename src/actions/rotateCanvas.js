export const ROTATE_CANVAS = 'ROTATE_CANVAS';

const rotateCanvas = (state, payload) => (
  state.adjustments.rotation !== payload.rotation
    ? {
      ...state,
      isDesignState: true,
      adjustments: {
        ...state.adjustments,
        rotation: payload.rotation,
      },
    }
    : state
);

export default rotateCanvas;

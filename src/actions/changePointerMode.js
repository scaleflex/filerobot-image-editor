export const CHANGE_POINTER_MODE = 'CHANGE_POINTER_MODE';

const changePointerMode = (state, payload) => (
  state.pointerMode !== payload.mode
    ? {
      ...state,
      pointerMode: payload.mode,
    }
    : state
);

export default changePointerMode;

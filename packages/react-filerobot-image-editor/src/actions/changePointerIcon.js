export const CHANGE_POINTER_ICON = 'CHANGE_POINTER_ICON';

const changingPointerIcon = (state, payload) =>
  state.pointerCssIcon !== payload.pointerCssIcon
    ? {
        ...state,
        pointerCssIcon: payload.pointerCssIcon,
      }
    : state;

export default changingPointerIcon;

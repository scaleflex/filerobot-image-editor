export const TOGGLE_TABS_NAVBAR = 'TOGGLE_TABS_NAVBAR';

const toggleTabsNavbar = (state, payload) => ({
  ...state,
  showTabsNavbar: payload.opened ?? !state.showTabsNavbar,
});

export default toggleTabsNavbar;

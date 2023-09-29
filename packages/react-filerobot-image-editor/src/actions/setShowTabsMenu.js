export const SET_SHOWN_TABS_MENU = 'SET_SHOWN_TABS_MENU';

const setShowTabsMenu = (state, payload) => ({
  ...state,
  showTabsMenu: payload.opened,
});

export default setShowTabsMenu;

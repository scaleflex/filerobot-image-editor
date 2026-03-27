import { POINTER_ICONS, TABS_IDS } from 'utils/constants';
import { TABS_TOOLS } from 'components/tools/tools.constants'

export const SELECT_TAB = 'SELECT_TAB';

const selectTab = (state, payload) =>
  payload.tabId === state.tabId
    ? state
    : {
        ...state,
        tabId: payload.tabId,
        toolId: payload.toolId || TABS_TOOLS[payload.tabId][0],
        selectionsIds: [],
        pointerCssIcon:
          payload.tabId === TABS_IDS.ANNOTATE
            ? POINTER_ICONS.DRAW
            : POINTER_ICONS.DEFAULT,
};

export default selectTab;

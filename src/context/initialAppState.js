/** Internal Dependencies */
import { TABS_TOOLS } from 'components/tools/tools.constants';
import { DEFAULT_ZOOM_FACTOR, POINTER_ICONS, TABS_IDS } from 'utils/constants';

// TODO: make some of these configurable
export default {
  pointerCssIcon: POINTER_ICONS.DEFAULT,
  canvasScale: 1,
  shownImageDimensions: {},
  zoom: {
    factor: DEFAULT_ZOOM_FACTOR,
    xPoint: null,
    yPoint: null,
  },
  isLoadingGlobally: true,
  // --- Start of design states ---
  finetunes: [],
  finetunesProps: {},
  filter: null,
  adjustments: {},
  annotations: {},
  // --- End of design states ---
  selectionsIds: [],
  tabId: TABS_IDS.ADJUST,
  toolId: TABS_TOOLS[TABS_IDS.ADJUST][0],
  /* For UNDO/REDO/RESET,
   * Current/present state => considered properties related to design of the whole 1st order state.
   * `pastDesignStates` => contains the past states of those design properties (undo).
   * `futureDesignStates` => contains the future states of those design properties (redo).
   * Reset => we reset those 3 states to their initial/empty values.
   */
  pastDesignStates: [],
  futureDesignStates: [],
};

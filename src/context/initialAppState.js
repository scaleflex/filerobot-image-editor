/** Internal Dependencies */
import { DEFAULT_ZOOM_FACTOR, POINTER_MODES, TABS_IDS } from 'utils/constants';

export default {
  canvasScale: 1,
  shownImageDimensions: {},
  zoom: {
    factor: DEFAULT_ZOOM_FACTOR,
    xPoint: null,
    yPoint: null,
  },
  isLoadingGlobally: true,
  // Determines mode of the pointer whether to select some shape to modify or to draw on the canvas
  pointerMode: POINTER_MODES.DEFAULT,
  // --- Start of design states ---
  finetunes: [],
  finetunesProps: {},
  filter: null,
  adjustments: {},
  annotations: {},
  // --- End of design states ---
  selectionsIds: [],
  tabId: TABS_IDS.ADJUST,
  toolId: null,
  /* For UNDO/REDO/RESET,
   * Current/present state => considered properties related to design of the whole 1st order state.
   * `pastDesignStates` => contains the past states of those design properties (undo).
   * `futureDesignStates` => contains the future states of those design properties (redo).
   * Reset => we reset those 3 states to their initial/empty values.
   */
  pastDesignStates: [],
  futureDesignStates: [],
};

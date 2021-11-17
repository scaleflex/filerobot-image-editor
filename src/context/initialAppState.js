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
    x: null,
    y: null,
  },
  isLoadingGlobally: true,
  // --- Start of design states ---
  finetunes: [],
  finetunesProps: {},
  filter: null,
  adjustments: {
    crop: {
      absoluteX: 0,
      absoluteY: 0,
      relativeX: 0,
      relativeY: 0,
      ratio: 'original',
      width: null,
      height: null,
    },
  },
  annotations: {},
  resize: {},
  // --- End of design states ---
  selectionsIds: [],
  tabId: null,
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

/** Internal Dependencies */
import { DEFAULT_ZOOM_FACTOR, POINTER_ICONS, TOOLS_IDS } from 'utils/constants';

const getInitialAppState = (config = {}) => ({
  // --- Start of design states ---
  imgSrc: typeof config.img === 'string' ? config.img : config.img?.src || '',
  finetunes: [],
  finetunesProps: {},
  filter: null,
  adjustments: {
    crop: {
      ratio: config[TOOLS_IDS.CROP].ratio,
      width: null,
      height: null,
      x: 0,
      y: 0,
    },
    isFlippedX: false,
    isFlippedY: false,
  },
  annotations: {},
  resize: {},
  // --- End of design states ---
  ...config.loadableDesignState, // if provided it would override the above design states
  pointerCssIcon: POINTER_ICONS.DEFAULT,
  canvasScale: 1,
  shownImageDimensions: {},
  zoom: {
    factor: DEFAULT_ZOOM_FACTOR,
    x: null,
    y: null,
  },
  isLoadingGlobally: true,
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
  isResetted: true,
  haveNotSavedChanges: false,
});

export default getInitialAppState;

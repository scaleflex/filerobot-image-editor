/** Internal Dependencies */
import { DEFAULT_ZOOM_FACTOR, POINTER_ICONS, TOOLS_IDS } from 'utils/constants';
import filterStrToClass from 'utils/filterStrToClass';
import finetunesStrsToClasses from 'utils/finetunesStrsToClasses';

const getInitialAppState = (config = {}) => {
  const loadedConfigPrepared = { ...config.loadableDesignState };

  if (Array.isArray(loadedConfigPrepared.finetunes)) {
    loadedConfigPrepared.finetunes = finetunesStrsToClasses(
      loadedConfigPrepared.finetunes,
    );
  }

  if (loadedConfigPrepared.filter) {
    loadedConfigPrepared.filter = filterStrToClass(loadedConfigPrepared.filter);
  }

  return {
    // --- Start of design states ---
    imgSrc:
      typeof config.source === 'string'
        ? config.source
        : config.source?.src || '',
    finetunes: [],
    finetunesProps: {},
    filter: null,
    adjustments: {
      crop: {
        ratio: config[TOOLS_IDS.CROP].ratio,
        ratioTitleKey:
          config[TOOLS_IDS.CROP].ratioTitleKey ?? config[TOOLS_IDS.CROP].ratio,
        width: null,
        height: null,
        x: 0,
        y: 0,
      },
      isFlippedX: false,
      isFlippedY: false,
      rotation: 0,
    },
    annotations: {},
    resize: {},
    // --- End of design states ---
    shownImageDimensions: {},
    ...loadedConfigPrepared, // if provided it would override the above design states
    pointerCssIcon: POINTER_ICONS.DEFAULT,
    canvasScale: 1,
    zoom: {
      factor: DEFAULT_ZOOM_FACTOR,
      x: null,
      y: null,
    },
    isLoadingGlobally: true,
    selectionsIds: [],
    tabId: config.defaultTabId || null,
    toolId: config.defaultToolId || null,
    feedback: {},
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
    latestColor: undefined,
  };
};

export default getInitialAppState;

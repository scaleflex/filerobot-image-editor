/** External Dependencies */
import Konva from 'konva';

/** Internal Dependencies */
import * as CustomFinetunes from 'custom/finetunes';
import * as CustomFilters from 'custom/filters';
import { DEFAULT_ZOOM_FACTOR, POINTER_ICONS, TOOLS_IDS } from 'utils/constants';

const getInitialAppState = (config = {}) => {
  const loadedConfigPrepared = { ...config.loadableDesignState };

  if (Array.isArray(loadedConfigPrepared.finetunes)) {
    loadedConfigPrepared.finetunes = loadedConfigPrepared.finetunes.map(
      (finetuneClassName) =>
        Konva.Filters[finetuneClassName] || CustomFinetunes[finetuneClassName],
    );
  }

  if (loadedConfigPrepared.filter) {
    const filterName = loadedConfigPrepared.filter;
    loadedConfigPrepared.filter =
      CustomFilters[filterName] || Konva.Filters[filterName];
  }

  return {
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
    ...loadedConfigPrepared, // if provided it would override the above design states
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
  };
};

export default getInitialAppState;

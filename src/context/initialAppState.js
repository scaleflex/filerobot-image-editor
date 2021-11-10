/** Internal Dependencies */
import { TABS_TOOLS } from 'components/tools/tools.constants';
import {
  DEFAULT_ZOOM_FACTOR,
  POINTER_ICONS,
  TABS_IDS,
  TOOLS_IDS,
} from 'utils/constants';

// TODO: make some of these configurable
export default {
  options: {
    common: {
      fill: '#000000', // or should be no color? === undefined
      stroke: '#000000', // or should be no color? === undefined
      strokeWidth: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
      shadowColor: '#000000', // or should be no color? === undefined
      shadowOpacity: 1,
      opacity: 1,
    },
    [TOOLS_IDS.TEXT]: {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur imperdiet tortor quis odio facilisis, id aliquet nulla facilisis. Etiam tincidunt tempor odio nec placerat.',
      fontFamily: 'Arial',
      fontSize: 14,
      letterSpacing: 0,
      lineHeight: 1,
      align: 'left', // left, center, right
      fontStyle: '', // 'bold', 'italic', 'bold italic'
    },
    [TOOLS_IDS.IMAGE]: {
      fill: undefined,
    },
    [TOOLS_IDS.RECT]: {
      cornerRadius: 0,
    },
    [TOOLS_IDS.ELLIPSE]: {},
    [TOOLS_IDS.POLYGON]: {
      sides: 3,
    },
    [TOOLS_IDS.PEN]: {
      strokeWidth: 1,
    },
    [TOOLS_IDS.LINE]: {
      lineCap: 'butt', // butt/round/square
      strokeWidth: 1,
    },
    [TOOLS_IDS.ARROW]: {
      strokeWidth: 6,
      lineCap: 'butt',
      pointerLength: undefined,
      pointerWidth: undefined,
    },
    [TABS_IDS.WATERMARK]: {
      gallery: [
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        'https://images.unsplash.com/photo-1627852847676-78102b6514ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      ],
    },
  },
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

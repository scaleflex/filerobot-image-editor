import {
  Adjust, ImageFilters, Crop, Watermark, Annotation,
} from '@scaleflex/icons';

export const ROOT_CONTAINER_ID = 'filerobot-image-editor_root-container';

export const EDITED_IMAGE_LAYER_ID = 'filerobot-image-editor_in-edit-image-layer';

export const TABS_IDS = {
  FINETUNE: 'FINTUNE',
  FILTERS: 'FILTERS',
  ADJUST: 'ADJUST',
  WATERMARK: 'WATERMARK',
  ANNOTATE: 'ANNOTATE',
};

export const AVAILABLE_TABS = [
  {
    id: TABS_IDS.FINETUNE,
    label: 'Finetune',
    icon: Adjust,
  },
  {
    id: TABS_IDS.FILTERS,
    label: 'Filters',
    icon: ImageFilters,
  },
  {
    id: TABS_IDS.ADJUST,
    label: 'Adjust',
    icon: Crop,
  },
  {
    id: TABS_IDS.WATERMARK,
    label: 'Watermark',
    icon: Watermark,
  },
  {
    id: TABS_IDS.ANNOTATE,
    label: 'Annotate',
    icon: Annotation,
  },
];

export const SHAPES_NAMES = {
  RECT: 'rect',
  CIRCLE: 'circle',
  ELLIPSE: 'ellipse',
  POLYGON: 'polygon',
  TEXT: 'text',
  LINE: 'line',
  IMAGE: 'image',
  ARROW: 'arrow',
  WATERMARK: 'watermark',
  FREEHAND: 'freehand',
  FREEHAND_LINE: 'freehand_group_line',
};

export const POINTER_MODES = {
  SELECT: 'SELECT',
  DRAW: 'DRAW',
};

export const POINTER_ICONS = {
  DEFAULT: 'default',
  CROSSHAIR: 'crosshair',
  MOVE: 'move',
};

export const DEFAULT_ENABLED_ANCHORS = ['top-left', 'top-center', 'top-right', 'middle-right', 'middle-left', 'bottom-left', 'bottom-center', 'bottom-right'];

export const DEFAULT_FONTS = ['Arial', 'Tahoma', 'Sans-serif', 'Roboto', 'Comic-sans', 'Times New Roman', 'Lato'];

export const ORIGINAL_CROP_RATIO = 'original';
export const CUSTOM_CROP_RATIO = 'custom';
export const CROP_RATIOS = [
  { label: 'Original', value: ORIGINAL_CROP_RATIO },
  { label: '1:1', value: 1 / 1 },
  { label: '3:2', value: 3 / 2 },
  { label: '2:3', value: 2 / 3 },
  { label: '4:3', value: 4 / 3 },
  { label: '5:4', value: 5 / 4 },
  { label: '7:5', value: 7 / 5 },
  { label: '16:9', value: 16 / 9 },
  { label: '9:16', value: 9 / 16 },
  { label: '21:9', value: 21 / 9 },
  { label: '9:21', value: 9 / 21 },
  { label: 'Custom', value: CUSTOM_CROP_RATIO },
];

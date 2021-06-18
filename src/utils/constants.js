import { Adjust, ImageFilters, Crop, Watermark, Annotation } from '@scaleflex/icons';

export const EDITED_IMAGE_LAYER_ID = 'filerobot-image-editor_in-edit-image-layer';

export const TABS_IDS = {
  FINETUNE: 'FINTUNE',
  FILTERS: 'FILTERS',
  ADJUST: 'ADJUST',
  WATERMARK: 'WATERMARK',
  ANNOTATE: 'ANNOTATE'
}

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
  MOVE: 'move'
};

export const DEFAULT_ENABLED_ANCHORS = ['top-left', 'top-center', 'top-right', 'middle-right', 'middle-left', 'bottom-left', 'bottom-center', 'bottom-right'];

export const DEFAULT_FONTS = ['Arial', 'Tahoma', 'Sans-serif', 'Roboto', 'Comic-sans', 'Times New Roman', 'Lato'];

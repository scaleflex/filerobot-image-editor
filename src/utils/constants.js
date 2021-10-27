export const MAX_CANVAS_WIDTH = 800;
export const MAX_CANVAS_HEIGHT = 800;

export const ROOT_CONTAINER_ID = 'filerobot-image-editor_root-container';
export const TRANSFORMER_LAYER_ID = 'filerobot-image-editor_transformer-layer';
export const IMAGE_NODE_ID = 'filerobot-image-editor_original-image';

export const TABS_IDS = {
  FINETUNE: 'FINTUNE',
  FILTERS: 'FILTERS',
  ADJUST: 'ADJUST',
  WATERMARK: 'WATERMARK',
  ANNOTATE: 'ANNOTATE',
  RESIZE: 'RESIZE',
};

export const TOOLS_IDS = {
  CROP: 'Crop',
  ROTATE: 'Rotate',
  FLIP_X: 'Flip_X',
  FLIP_Y: 'Flip_Y',
  BRIGHTNESS: 'Brightness',
  CONTRAST: 'Contrast',
  HSV: 'HueSaturationValue',
  WARMTH: 'Warmth',
  BLUR: 'Blur',
  THRESHOLD: 'Threshold',
  POSTERIZE: 'Posterize',
  PIXELATE: 'Pixelate',
  NOISE: 'Noise',
  // Vignette: 'Vignette',
  FILTERS: 'Filters',
  RECT: 'Rect',
  ELLIPSE: 'Ellipse',
  POLYGON: 'Polygon',
  TEXT: 'Text',
  LINE: 'Line',
  IMAGE: 'Image',
  ARROW: 'Arrow',
  WATERMARK: 'Watermark',
  PEN: 'Pen',
};

export const FLIP_DIRECTIONS = {
  X: 'X',
  Y: 'Y',
};

export const DEFAULT_ZOOM_FACTOR = 1;

// TODO: We might remove it.
export const ANNOTATIONS_NAMES = {
  RECT: 'rect',
  ELLIPSE: 'ellipse',
  POLYGON: 'polygon',
  TEXT: 'text',
  LINE: 'line',
  IMAGE: 'image',
  ARROW: 'arrow',
  PEN: 'pen',
};

export const POINTER_ICONS = {
  DEFAULT: 'default',
  DRAW: 'crosshair',
  SELECT: 'pointer',
  MOVE: 'move',
};

export const DEFAULT_ENABLED_ANCHORS = [
  'top-left',
  'top-center',
  'top-right',
  'middle-right',
  'middle-left',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

export const DEFAULT_FONTS = [
  'Arial',
  'Tahoma',
  'Sans-serif',
  'Roboto',
  'Comic-sans',
  'Times New Roman',
  'Lato',
];

export const ORIGINAL_CROP = 'original';
export const CUSTOM_CROP = 'custom';
export const ELLIPSE_CROP = 'ellipse';

export const MAIN_CANVAS_ID = 'filerobot-image-editor_main-canvas';

export const POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_CENTER: 'top-center',
  TOP_RIGHT: 'top-right',
  MIDDLE_LEFT: 'middle-left',
  MIDDLE_CENTER: 'middle-center',
  MIDDLE_RIGHT: 'middle-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_RIGHT: 'bottom-right',
};

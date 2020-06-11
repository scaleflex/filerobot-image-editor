// 'effects', 'filters', 'adjust', 'crop', 'resize', 'rotate'
const TOOLS = [
  'adjust', 'effects', 'filters', 'rotate', 'crop', 'resize', 'watermark'
];

// 'clarity', 'edge_enhance', 'emboss', 'grungy', 'hazy', 'lomo', 'noise', 'old_paper', 'posterize', 'radial_blur',
//   'sin_city', 'tilt_shift'
const EFFECTS = [
  'edge_enhance', 'emboss', 'grungy', 'hazy', 'lomo', 'radial_blur', 'sin_city', 'tilt_shift'
];

// 'colorize', 'contrast', 'cross_process', 'glow_sun', 'hdr_effect', 'jarques', 'love', 'old_boot',
//   'orange_peel', 'pin_hole', 'pleasant', 'sepia', 'sun_rise', 'vintage'
const FILTERS = [
  'cross_process', 'glow_sun', 'jarques', 'love', 'old_boot', 'orange_peel', 'pin_hole', 'sepia', 'sun_rise', 'vintage'
];

const CLOUDIMAGE_OPERATIONS = ['crop', 'resize', 'rotate', 'watermark'];

const WATERMARK_POSITIONS = [
  "left-top",
  "center-top",
  "right-top",
  "left-center",
  "center",
  "right-center",
  "left-bottom",
  "center-bottom",
  "right-bottom"
];

// possible positions ["corners", "star", "center", "top-row", "center-row", "bottom-row"]
const WATERMARK_POSITIONS_PRESET = {
  "corners": [
    1, 0, 1,
    0, 0, 0,
    1, 0, 1,
  ],
  "star": [
    0, 1, 0,
    1, 1, 1,
    0, 1, 0,
  ],
  "center": [
    0, 0, 0,
    0, 1, 0,
    0, 0, 0,
  ],
  "top-row": [
    1, 1, 1,
    0, 0, 0,
    0, 0, 0,
  ],
  "center-row": [
    0, 0, 0,
    1, 1, 1,
    0, 0, 0,
  ],
  "bottom-row": [
    0, 0, 0,
    0, 0, 0,
    1, 1, 1,
  ],
};

export const DEFAULT_WATERMARK = {
  opacity: 0.7,
  position: 'center',
  url: '',
  applyByDefault: false
};

const cropPresets = [
  { name: 'original', value: 0 },
  { name: 'square', value: 1 },
  { name: 'banner', value: 7.8 },
  { name: 'round', value: 1, radius: 50 },
  { name: '5 : 4', value: 1.25 },
  { name: '4 : 3', value: 1.33333 },
  { name: '6 : 4', value: 1.5 },
  { name: '16 : 9', value: 1.7777 }
];

const resizePresets = [
    { name: 'big square', width: 600, height: 600, ratio: 1 },
    { name: 'middle square', width: 400, height: 400, ratio: 1 },
    { name: 'small square', width: 200, height: 200, ratio: 1 },
    { name: 'small size', width: 1200, height: 960, ratio: 1.25 },
    { name: 'better quality', width: 1920, height: 1536, ratio: 1.25 },
    { name: 'small size', width: 1200, height: 900, ratio: 1.33333 },
    { name: 'better quality', width: 1920, height: 1440, ratio: 1.33333 },
    { name: 'small size', width: 1200, height: 800, ratio: 1.5 },
    { name: 'better quality', width: 1920, height: 1280, ratio: 1.5 },
    { name: 'small size', width: 1200, height: 675, ratio: 1.7777 },
    { name: 'better quality', width: 1920, height: 1080, ratio: 1.7777 },
    { name: 'small banner', width: 468, height: 60, ratio: 7.8 },
    { name: 'big banner', width: 936, height: 120, ratio: 7.8 }
];

const UPLOADER = {
  hideCloudimageSwitcher: true,
  processWithCloudimage: false,
  uploadWithCloudimageLink: false,
  elementId: null,
  isLowQualityPreview: true,

  reduceBeforeEdit: {
    mode: 'manual',
    widthLimit: 2000,
    heightLimit: 2000
  },

  cropBeforeEdit: null,

  cropPresets,

  resizePresets
}

export { TOOLS, EFFECTS, FILTERS, UPLOADER, CLOUDIMAGE_OPERATIONS, WATERMARK_POSITIONS, WATERMARK_POSITIONS_PRESET };

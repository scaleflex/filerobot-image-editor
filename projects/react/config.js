// The library modal ID.
const MODAL_ID = 'filerobot-image-editor';

// ID for preview canvas (canvas contains watermark, shapes...etc).
const PREVIEW_CANVAS_ID = 'scaleflex-filerobot-edit-box';

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

const CLOUDIMAGE_OPERATIONS = ['crop', 'resize', 'rotate', 'watermark', 'focus_point'];

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

const WATERMARK_STANDARD_FONTS = [
  { label: 'Arial', value: 'Arial' },
  { label: 'Tahoma', value: 'Tahoma' },
  { label: 'Times New Roman', value: 'Times New Roman' },
  { label: 'Courier', value: 'Courier' },
  { label: 'Courier New', value: 'Courier New' },
  { label: 'Verdana', value: 'Verdana' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Palatino', value: 'Palatino' },
  { label: 'Garamond', value: 'Garamond' },
  { label: 'Bookman', value: 'Bookman' },
  { label: 'Comic Sans MS', value: 'Comic Sans MS' },
  { label: 'Candara', value: 'Candara' },
  { label: 'Impact', value: 'Impact' },
];

const WATERMARK_CLOUDIMAGE_FONTS = [
  { label: 'Arial', value: 'Arial' },
  { label: 'Arial Bold', value: 'Arial-Bold' },
  { label: 'Arial Black', value: 'Arial-Black' },
  { label: 'AvantGarde Book', value: 'AvantGarde-Book' },
  { label: 'Bitstream Charter', value: 'Bitstream-Charter' },
  { label: 'Bitstream Charter Bold', value: 'Bitstream-Charter-Bold' },
  { label: 'Bookman Demi', value: 'Bookman-Demi' },
  { label: 'Comic Sans MS', value: 'Comic-Sans-MS' },
  { label: 'Courier', value: 'Courier' },
  { label: 'Courier Bold', value: 'Courier-Bold' },
  { label: 'Courier New', value: 'Courier-New	' },
  { label: 'Courier New Bold', value: 'Courier-New-bold' },
  { label: 'DejaVu Sans', value: 'DejaVu-Sans' },
  { label: 'DejaVu Sans Bold', value: 'DejaVu-Sans-bold' },
  { label: 'Dingbats', value: 'Dingbats' },
  { label: 'fixed', value: 'fixed' },
  { label: 'FreeMono', value: 'FreeMono' },
  { label: 'FreeMono Bold', value: 'FreeMono-Bold' },
  { label: 'FreeSans', value: 'FreeSans-Bold' },
  { label: 'Halvetica', value: 'Halvetica' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Impact', value: 'Impact' },
  { label: 'Noto mono', value: 'Noto-Mono' },
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

export { MODAL_ID, PREVIEW_CANVAS_ID, TOOLS, EFFECTS, FILTERS, UPLOADER, CLOUDIMAGE_OPERATIONS, WATERMARK_POSITIONS, WATERMARK_POSITIONS_PRESET, WATERMARK_STANDARD_FONTS, WATERMARK_CLOUDIMAGE_FONTS };

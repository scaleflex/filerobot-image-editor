// 'effects', 'filters', 'adjust', 'crop', 'resize', 'rotate'
const TOOLS = [
  'adjust', 'effects', 'filters', 'rotate', 'crop', 'resize'
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

const CLOUDIMAGE_OPERATIONS = ['crop', 'resize', 'rotate'];

const cropPresets = [
  { name: 'original', value: 0 },
  { name: 'square', value: 1 },
  { name: '5 : 4', value: 1.25 },
  { name: '4 : 3', value: 1.33333 },
  { name: '6 : 4', value: 1.5 },
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

  cropPresets
}

export { TOOLS, EFFECTS, FILTERS, UPLOADER, CLOUDIMAGE_OPERATIONS };

/** External Dependencies */
import { Custom, Ellipse, Square, Landscape, Portrait } from '@scaleflex/icons';

/** Internal Dependencies */
import { CUSTOM_CROP, ELLIPSE_CROP, ORIGINAL_CROP } from 'utils/constants';

export const CROP_PRESETS = [
  {
    title: 'Original',
    ratio: ORIGINAL_CROP,
  },
  {
    title: 'Custom',
    ratio: CUSTOM_CROP,
    Icon: Custom,
  },
  {
    title: 'Square',
    ratio: 1,
    ratioLabel: '1:1',
    Icon: Square,
  },
  {
    title: 'Landscape',
    ratio: 16 / 9,
    ratioLabel: '16:9',
    Icon: Landscape,
  },
  {
    title: 'Portrait',
    ratio: 9 / 16,
    ratioLabel: '9:16',
    Icon: Portrait,
  },
  {
    title: 'Ellipse',
    ratio: ELLIPSE_CROP,
    Icon: Ellipse,
  },
  {
    title: 'Classic TV',
    ratio: 4 / 3,
    ratioLabel: '4:3',
    // Icon: CropCinemascope
  },
  {
    title: 'Cinemascope',
    ratio: 21 / 9,
    ratioLabel: '21:9',
    // Icon: CropCinemascope
  },
];

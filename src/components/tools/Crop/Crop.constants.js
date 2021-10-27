/** Internal Dependencies */
import { Square } from '@scaleflex/icons';
import { Custom, Ellipse, Landscape, Portrait } from 'components/common/icons';
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
    title: 'Landscape',
    ratio: 16 / 9,
    ratioLabel: '16:9',
    Icon: Landscape,
  },
  {
    title: 'Square',
    ratio: 1,
    ratioLabel: '16:9',
    Icon: Square,
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
  },
  {
    title: 'Cinemascope',
    ratio: 21 / 9,
    ratioLabel: '21:9',
  },
];

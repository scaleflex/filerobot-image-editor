/** External Dependencies */
import {
  Custom,
  Ellipse,
  Square,
  Landscape,
  Portrait,
  CropClassicTv,
  CropCinemaScope,
} from '@scaleflex/icons';

/** Internal Dependencies */
import { CUSTOM_CROP, ELLIPSE_CROP, ORIGINAL_CROP } from 'utils/constants';

export const CROP_PRESETS = [
  {
    titleKey: 'original',
    ratio: ORIGINAL_CROP,
  },
  {
    titleKey: 'custom',
    ratio: CUSTOM_CROP,
    Icon: Custom,
  },
  {
    titleKey: 'square',
    ratio: 1,
    ratioLabel: '1:1',
    Icon: Square,
  },
  {
    titleKey: 'landscape',
    ratio: 16 / 9,
    ratioLabel: '16:9',
    Icon: Landscape,
  },
  {
    titleKey: 'portrait',
    ratio: 9 / 16,
    ratioLabel: '9:16',
    Icon: Portrait,
  },
  {
    titleKey: 'ellipse',
    ratio: ELLIPSE_CROP,
    Icon: Ellipse,
  },
  {
    titleKey: 'classicTv',
    ratio: 4 / 3,
    ratioLabel: '4:3',
    Icon: CropClassicTv,
  },
  {
    titleKey: 'cinemascope',
    ratio: 21 / 9,
    ratioLabel: '21:9',
    Icon: CropCinemaScope,
  },
];

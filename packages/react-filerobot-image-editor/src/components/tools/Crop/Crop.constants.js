/** External Dependencies */
import Custom from '@scaleflex/icons/custom';
import Ellipse from '@scaleflex/icons/ellipse';
import Square from '@scaleflex/icons/square';
import Landscape from '@scaleflex/icons/landscape';
import Portrait from '@scaleflex/icons/portrait';
import CropClassicTv from '@scaleflex/icons/crop-classic-tv';
import CropCinemaScope from '@scaleflex/icons/crop-cinema-scope';
import ImageOutline from '@scaleflex/icons/image-outline';

/** Internal Dependencies */
import { CUSTOM_CROP, ELLIPSE_CROP, ORIGINAL_CROP } from 'utils/constants';
import toPrecisedFloat from 'utils/toPrecisedFloat';

export const CROP_PRESETS = [
  {
    titleKey: 'original',
    ratio: ORIGINAL_CROP,
    Icon: ImageOutline,
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
    ratio: toPrecisedFloat(16 / 9),
    ratioLabel: '16:9',
    Icon: Landscape,
  },
  {
    titleKey: 'portrait',
    ratio: toPrecisedFloat(9 / 16),
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
    ratio: toPrecisedFloat(4 / 3),
    ratioLabel: '4:3',
    Icon: CropClassicTv,
  },
  {
    titleKey: 'cinemascope',
    ratio: toPrecisedFloat(21 / 9),
    ratioLabel: '21:9',
    Icon: CropCinemaScope,
  },
];

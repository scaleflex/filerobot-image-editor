/** External Dependencies */
import Custom from '@scaleflex/icons/custom';
import Ellipse from '@scaleflex/icons/ellipse';
import Landscape from '@scaleflex/icons/landscape';
import Portrait from '@scaleflex/icons/portrait';
import ImageOutline from '@scaleflex/icons/image-outline';

/** Internal Dependencies */
import { CUSTOM_CROP, ELLIPSE_CROP, ORIGINAL_CROP } from 'utils/constants';
import toPrecisedFloat from 'utils/toPrecisedFloat';

export const DEFAULT_CROP_PRESETS = [
  {
    titleKey: 'original',
    ratio: ORIGINAL_CROP,
    icon: ImageOutline,
  },
  {
    titleKey: 'custom',
    ratio: CUSTOM_CROP,
    icon: Custom,
  },
  {
    titleKey: 'landscape',
    descriptionKey: '16:9',
    ratio: toPrecisedFloat(16 / 9),
    icon: Landscape,
  },
  {
    titleKey: 'portrait',
    descriptionKey: '9:16',
    ratio: toPrecisedFloat(9 / 16),
    icon: Portrait,
  },
  {
    titleKey: 'ellipse',
    ratio: ELLIPSE_CROP,
    icon: Ellipse,
  },
];

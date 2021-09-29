/** Internal Dependencies */
import { TABS_IDS, TOOLS_IDS } from 'utils/constants';
import { Brightness, BrightnessOptions } from './Brightness';
import { Crop, CropOptions } from './Crop';
import { FlipX, FlipY } from './Flip';
import { Rotate, RotateOptions } from './Rotate';
import { Contrast, ContrastOptions } from './Contrast';
import { HSV, HSVOptions } from './HSV';
import { Blur, BlurOptions } from './Blur';
import { Warmth, WarmthOptions } from './Warmth';
import { Filters } from './Filters';
import { Rect, RectOptions } from './Rect';

export const TOOLS_ITEMS = {
  [TOOLS_IDS.CROP]: {
    id: TOOLS_IDS.CROP,
    Item: Crop,
    ItemOptions: CropOptions,
  },
  [TOOLS_IDS.ROTATE]: {
    id: TOOLS_IDS.ROTATE,
    Item: Rotate,
    ItemOptions: RotateOptions,
  },
  [TOOLS_IDS.FLIP_X]: {
    id: TOOLS_IDS.FLIP_X,
    Item: FlipX,
  },
  [TOOLS_IDS.FLIP_Y]: {
    id: TOOLS_IDS.FLIP_Y,
    Item: FlipY,
  },
  [TOOLS_IDS.BRIGHTNESS]: {
    id: TOOLS_IDS.BRIGHTNESS,
    Item: Brightness,
    ItemOptions: BrightnessOptions,
  },
  [TOOLS_IDS.CONTRAST]: {
    id: TOOLS_IDS.CONTRAST,
    Item: Contrast,
    ItemOptions: ContrastOptions,
  },
  [TOOLS_IDS.HSV]: {
    id: TOOLS_IDS.HSV,
    Item: HSV,
    ItemOptions: HSVOptions,
  },
  [TOOLS_IDS.BLUR]: {
    id: TOOLS_IDS.BLUR,
    Item: Blur,
    ItemOptions: BlurOptions,
  },
  [TOOLS_IDS.WARMTH]: {
    id: TOOLS_IDS.WARMTH,
    Item: Warmth,
    ItemOptions: WarmthOptions,
  },
  [TOOLS_IDS.FILTERS]: {
    id: TOOLS_IDS.FILTERS,
    Item: Filters,
  },
  [TOOLS_IDS.RECT]: {
    id: TOOLS_IDS.RECT,
    Item: Rect,
    ItemOptions: RectOptions,
  },
};

export const TABS_TOOLS = {
  [TABS_IDS.ADJUST]: [
    TOOLS_ITEMS[TOOLS_IDS.CROP],
    TOOLS_ITEMS[TOOLS_IDS.ROTATE],
    TOOLS_ITEMS[TOOLS_IDS.FLIP_X],
    TOOLS_ITEMS[TOOLS_IDS.FLIP_Y],
  ],
  [TABS_IDS.FINETUNE]: [
    TOOLS_ITEMS[TOOLS_IDS.BRIGHTNESS],
    TOOLS_ITEMS[TOOLS_IDS.CONTRAST],
    TOOLS_ITEMS[TOOLS_IDS.HSV],
    TOOLS_ITEMS[TOOLS_IDS.BLUR],
    TOOLS_ITEMS[TOOLS_IDS.WARMTH],
  ],
  [TABS_IDS.FILTERS]: [
    TOOLS_ITEMS[TOOLS_IDS.FILTERS],
  ],
  [TABS_IDS.ANNOTATE]: [
    TOOLS_ITEMS[TOOLS_IDS.RECT],
  ],
};

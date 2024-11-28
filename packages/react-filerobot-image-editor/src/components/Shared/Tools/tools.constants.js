/** Internal Dependencies */
import { TABS_IDS, TOOLS_IDS } from 'utils/constants';
import { Crop } from './Crop';
import { FlipX, FlipY } from './Flip';
import { RotateButton, RotateOptions } from './Rotate';
import { Resize } from './Resize';

export const COMMON_TOOLS_ITEMS = {
  [TOOLS_IDS.CROP]: {
    id: TOOLS_IDS.CROP,
    Item: Crop,
  },
  [TOOLS_IDS.ROTATE]: {
    id: TOOLS_IDS.ROTATE,
    Item: RotateButton,
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
  [TOOLS_IDS.RESIZE]: {
    id: TOOLS_IDS.RESIZE,
    Item: Resize,
  },
};

export const TABS_TOOLS = {
  [TABS_IDS.ADJUST]: [
    TOOLS_IDS.CROP,
    TOOLS_IDS.ROTATE,
    TOOLS_IDS.FLIP_X,
    TOOLS_IDS.FLIP_Y,
  ],
  [TABS_IDS.FINETUNE]: [
    TOOLS_IDS.BRIGHTNESS,
    TOOLS_IDS.CONTRAST,
    TOOLS_IDS.HSV,
    TOOLS_IDS.BLUR,
    TOOLS_IDS.WARMTH,
  ],
  [TABS_IDS.FILTERS]: [TOOLS_IDS.FILTERS],
  [TABS_IDS.WATERMARK]: [TOOLS_IDS.WATERMARK],
  [TABS_IDS.ANNOTATE]: [
    TOOLS_IDS.TEXT,
    TOOLS_IDS.IMAGE,
    TOOLS_IDS.RECT,
    TOOLS_IDS.ELLIPSE,
    TOOLS_IDS.POLYGON,
    TOOLS_IDS.PEN,
    TOOLS_IDS.LINE,
    TOOLS_IDS.ARROW,
  ],
  [TABS_IDS.RESIZE]: [TOOLS_IDS.RESIZE],
  [TABS_IDS.TRIM]: [TOOLS_IDS.TRIM],
};

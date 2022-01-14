/** Internal Dependencies */
import { TABS_IDS, TOOLS_IDS } from 'utils/constants';
import { Brightness, BrightnessOptions } from './Brightness';
import { Crop } from './Crop';
import { FlipX, FlipY } from './Flip';
import { RotateButton, RotateOptions } from './Rotate';
import { Contrast, ContrastOptions } from './Contrast';
import { HSV, HSVOptions } from './HSV';
import { Blur, BlurOptions } from './Blur';
import { Warmth, WarmthOptions } from './Warmth';
import { Filters } from './Filters';
import { TextButton, TextOptions } from './Text';
import { ImageButton, ImageOptions } from './Image';
import { RectButton, RectOptions } from './Rect';
import { EllipseButton, EllipseOptions } from './Ellipse';
import { PenButton, PenOptions } from './Pen';
import { LineButton, LineOptions } from './Line';
import { ArrowButton, ArrowOptions } from './Arrow';
import { PolygonButton, PolygonOptions } from './Polygon';
import { Resize } from './Resize';
import { Watermark } from './Watermark';

export const TOOLS_ITEMS = {
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
    hideFn: ({ useCloudimage }) => useCloudimage,
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
    hideFn: ({ useCloudimage }) => useCloudimage,
  },
  [TOOLS_IDS.FILTERS]: {
    id: TOOLS_IDS.FILTERS,
    Item: Filters,
  },
  [TOOLS_IDS.WATERMARK]: {
    id: TOOLS_IDS.WATERMARK,
    Item: Watermark,
  },
  [TOOLS_IDS.TEXT]: {
    id: TOOLS_IDS.TEXT,
    Item: TextButton,
    ItemOptions: TextOptions,
  },
  [TOOLS_IDS.IMAGE]: {
    id: TOOLS_IDS.IMAGE,
    Item: ImageButton,
    ItemOptions: ImageOptions,
  },
  [TOOLS_IDS.RECT]: {
    id: TOOLS_IDS.RECT,
    Item: RectButton,
    ItemOptions: RectOptions,
  },
  [TOOLS_IDS.POLYGON]: {
    id: TOOLS_IDS.POLYGON,
    Item: PolygonButton,
    ItemOptions: PolygonOptions,
  },
  [TOOLS_IDS.ELLIPSE]: {
    id: TOOLS_IDS.ELLIPSE,
    Item: EllipseButton,
    ItemOptions: EllipseOptions,
  },
  [TOOLS_IDS.PEN]: {
    id: TOOLS_IDS.PEN,
    Item: PenButton,
    ItemOptions: PenOptions,
  },
  [TOOLS_IDS.LINE]: {
    id: TOOLS_IDS.LINE,
    Item: LineButton,
    ItemOptions: LineOptions,
  },
  [TOOLS_IDS.ARROW]: {
    id: TOOLS_IDS.ARROW,
    Item: ArrowButton,
    ItemOptions: ArrowOptions,
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
};

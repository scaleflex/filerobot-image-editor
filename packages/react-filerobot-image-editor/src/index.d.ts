// TODO: Make sure the types are linked with no issues.
/** External Dependencies */
import { Filter } from "konva/lib/Node";

type lineCap = 'butt' | 'round' | 'square';

// TABS_IDS
type availableTabs = 'Finetune' | 'Filters' | 'Adjust' | 'Watermark' | 'Annotate' | 'Resize';

// TOOLS_IDS
// type availableTools = 'Crop' | 'Rotate' | 'Flip_X' | 'Flip_Y' | 'Brightness' | 'Contrast' | 'HueSaturationValue' | 'Warmth' | 'Blur' | 'Threshold' | 'Posterize' | 'Pixelate' | 'Noise' | 'Filters' | 'Rect' | 'Ellipse' | 'Polygon' | 'Text' | 'Line' | 'Image' | 'Arrow' | 'Watermark' | 'Pen' | 'Resize';
type availableTools = 'Crop' | 'Flip_X' | 'Flip_Y' | 'Brightness' | 'Contrast' | 'HueSaturationValue' | 'Warmth' | 'Blur' | 'Threshold' | 'Posterize' | 'Pixelate' | 'Noise' | 'Filters' | 'Rect' | 'Ellipse' | 'Polygon' | 'Text' | 'Line' | 'Image' | 'Arrow' | 'Watermark' | 'Pen' | 'Resize';

// CLOSING_REASONS
type closingReasons = 'after-saving' | 'close-button-clicked' | 'back-button-clicked' | string;

type imageInfo = {
  name: string,
  extension: string,
  mimeType: string,
  fullName?: string,
  height?: number,
  width?: number,
  imageBase64?: string,
  quality?: number;
}

type imageDesignState = {
  imageSrc?: string,
  finetunes?: Filter[],
  finetunesProps?: object,
  filter: object,
  adjustments: object,
  annotations: object,
  resize: object
};

type annotationsCommon = {
  fill?: string,
  stroke?: string,
  strokeWidth?: number
  shadowOffsetX?: number,
  shadowOffsetY?: number,
  shadowBlur?: number,
  shadowColor?: string,
  shadowOpacity?: number,
  opacity?: number,
}

export interface FilerobotImageEditorConfig {
  image: string | HTMLImageElement;
  annotationsCommon?: annotationsCommon;
  // [TOOLS_IDS.TEXT]
  Text?: annotationsCommon & {
    text?: string;
    fontFamily?: string;
    fonts?: (string | { label: string; value: string })[];
    fontSize?: number;
    letterSpacing?: number;
    lineHeight?: number;
    align?: 'left' | 'center' | 'right';
    fontStyle?: 'normal' | 'bold' | 'italic' | 'bold italic';
  };
  // [TOOLS_IDS.IMAGE]
  Image?: annotationsCommon;
  // [TOOLS_IDS.ELLIPSE]
  Ellipse?: annotationsCommon;
  // [TOOLS_IDS.RECT]
  Rect?: annotationsCommon & {
    cornerRadius?: number;
  };
  // [TOOLS_IDS.POLYGON]
  Polygon?: annotationsCommon & {
    sides: 3;
  };
  // [TOOLS_IDS.PEN]
  Pen?: annotationsCommon & {
    strokeWidth: 1;
  };
  // [TOOLS_IDS.LINE]: {
  Line?: annotationsCommon & {
    lineCap?: lineCap;
    strokeWidth?: number;
  };
  // [TOOLS_IDS.ARROW]: {
  Arrow?: annotationsCommon & {
      strokeWidth?: number;
      lineCap?: lineCap;
      pointerLength?: number;
      pointerWidth?: number;
    };
  // [TOOLS_IDS.WATERMARK]
  Watermark: {
    gallery?: string[] | [];
  };
  // [TOOLS_IDS.CROP]
  Crop?: {
    minWidth?: number;
    minHeight?: number;
    maxWidth?: null;
    maxHeight?: null;
    ratio?: 'original' | 'custom' | 'ellipse' | number;
    noPresets?: boolean;
  };
  // TABS_IDS
  tabsIds?: (availableTabs)[] | [];
  defaultTabId?: availableTabs;
  defaultToolId?: availableTools;
  onBeforeSave?: (imageInfo: imageInfo) => void | boolean;
  onSave?: (imageInfo: imageInfo, imageDesignState: imageDesignState) => void;
  onClose?: (closeReason: closingReasons) => void;
  closeAfterSaving?: boolean;
  defaultSavedImageType?: 'png' | 'jpeg' | 'webp';
  forceToPngInEllipticalCrop?: boolean;
  useBackendTranslations?: boolean;
  translations?: object;
  language?: 'en' | 'fr' | 'de' | 'it' | 'pt' | 'es' | 'nl' | 'pl' | 'ro' | string;
  avoidChangesNotSavedAlertOnLeave?: boolean;
  loadableDesignState?: object;
  showBackButton?: boolean;
}

declare const FilerobotImageEditor: React.FC<FilerobotImageEditorConfig>;
export default FilerobotImageEditor;

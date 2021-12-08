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
  cloudimageUrl?: string;
}

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

type textAnnotation = annotationsCommon & {
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  letterSpacing?: number;
  lineHeight?: number;
  align?: 'left' | 'center' | 'right';
  fontStyle?: 'normal' | 'bold' | 'italic' | 'bold italic';
}

type rectAnnotation = annotationsCommon & {
  cornerRadius?: number;
}

type polygonAnnotation = annotationsCommon & {
  sides?: number;
}

type penAnnotation = annotationsCommon & {
  tension?: number;
  lineCap?: lineCap;
}

type lineAnnotation = annotationsCommon & {
  lineCap?: lineCap;
}

type arrowAnnotation = annotationsCommon & {
  lineCap?: lineCap;
  pointerLength?: number;
  pointerWidth?: number;
}

type imageDesignState = {
  imgSrc?: string,
  finetunes?: Filter[],
  finetunesProps?: {
    brightness?: number;
    contrast?: number;
    hue?: number;
    saturation?: number;
    value: number;
    blurRadius?: number;
    warmth?: number;
  },
  filter?: Filter,
  adjustments?: {
    crop: {
      ratio: string;
      width?: number,
      height?: number,
      absoluteX?: number,
      absoluteY?: number,
      relativeX?: number,
      relativeY?: number,
    },
    isFlippedX?: boolean;
    isFlippedY?: boolean;
  },
  annotations?: {
    [key?: string]: annotationsCommon &
      (textAnnotation | rectAnnotation | polygonAnnotation | penAnnotation | lineAnnotation | arrowAnnotation) &
      {
        id: string;
        name: string;
        x: number;
        y: number;
        scaleX?: number;
        scaleY?: number;
        width?: number; //Text/Image/Rect
        height?: number; //Text/Image/Rect
        radius?: number; // Polygon
        radiusX?: number; // Ellipse
        radiusY?: number; // Ellipse
        points?: number[]; // Pen/Line/Arrow
        image?: string | HTMLElement; // Image
      }
  },
  resize?: {
    width?: number;
    height?: number;
  },
};

export interface FilerobotImageEditorConfig {
  img: string | HTMLImageElement;
  annotationsCommon?: annotationsCommon;
  // [TOOLS_IDS.TEXT]
  Text?: textAnnotation & {
    fonts?: (string | { label: string; value: string })[];
  };
  // [TOOLS_IDS.IMAGE]
  Image?: annotationsCommon;
  // [TOOLS_IDS.ELLIPSE]
  Ellipse?: annotationsCommon;
  // [TOOLS_IDS.RECT]
  Rect?: rectAnnotation;
  // [TOOLS_IDS.POLYGON]
  Polygon?: polygonAnnotation;
  // [TOOLS_IDS.PEN]
  Pen?: penAnnotation;
  // [TOOLS_IDS.LINE]: {
  Line?: lineAnnotation;
  // [TOOLS_IDS.ARROW]: {
  Arrow?: arrowAnnotation;
  // [TOOLS_IDS.WATERMARK]
  Watermark?: {
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
  closeAfterSave?: boolean;
  defaultSavedImageType?: 'png' | 'jpeg' | 'webp';
  forceToPngInEllipticalCrop?: boolean;
  useBackendTranslations?: boolean;
  translations?: object;
  language?: 'en' | 'fr' | 'de' | 'it' | 'pt' | 'es' | 'nl' | 'pl' | 'ro' | string;
  avoidChangesNotSavedAlertOnLeave?: boolean;
  loadableDesignState?: imageDesignState;
  showBackButton?: boolean;
  useCloudimage?: boolean;
  cloudimage?: {
    token: string;
    version?: string;
    secureProtocol?: boolean;
    imageSealing?: {
      enable?: boolean;
      salt?: string;
      charCount?: number;
      includeParams?: string[];
    }
  }
}

declare const FilerobotImageEditor: FilerobotImageEditorConfig;
export default FilerobotImageEditor;

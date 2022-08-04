import { FunctionComponent, RefObject } from 'react';

declare const TABS = {
  FINETUNE: 'Finetune',
  FILTERS: 'Filters',
  ADJUST: 'Adjust',
  WATERMARK: 'Watermark',
  ANNOTATE: 'Annotate',
  RESIZE: 'Resize',
} as const;

declare const TOOLS = {
  CROP: 'Crop',
  ROTATE: 'Rotate',
  FLIP_X: 'Flip_X',
  FLIP_Y: 'Flip_Y',
  BRIGHTNESS: 'Brightness',
  CONTRAST: 'Contrast',
  HSV: 'HueSaturationValue',
  WARMTH: 'Warmth',
  BLUR: 'Blur',
  THRESHOLD: 'Threshold',
  POSTERIZE: 'Posterize',
  PIXELATE: 'Pixelate',
  NOISE: 'Noise',
  FILTERS: 'Filters',
  RECT: 'Rect',
  ELLIPSE: 'Ellipse',
  POLYGON: 'Polygon',
  TEXT: 'Text',
  LINE: 'Line',
  IMAGE: 'Image',
  ARROW: 'Arrow',
  WATERMARK: 'Watermark',
  PEN: 'Pen',
  RESIZE: 'Resize',
} as const;

// TABS_IDS
type availableTabs = typeof TABS[keyof typeof TABS];

// TOOLS_IDS
type availableTools = typeof TOOLS[keyof typeof TOOLS];

type lineCap = 'butt' | 'round' | 'square';

// CLOSING_REASONS
type closingReasons =
  | 'after-saving'
  | 'close-button-clicked'
  | 'back-button-clicked'
  | string;

type savedImageData = {
  name: string;
  extension: string;
  mimeType: string;
  fullName?: string;
  height?: number;
  width?: number;
  imageBase64?: string;
  imageCanvas?: HTMLCanvasElement; // doesn't support quality
  quality?: number;
  cloudimageUrl?: string;
};

type annotationsCommon = {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowBlur?: number;
  shadowColor?: string;
  shadowOpacity?: number;
  opacity?: number;
};

type textAnnotation = annotationsCommon & {
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  letterSpacing?: number;
  lineHeight?: number;
  align?: 'left' | 'center' | 'right';
  fontStyle?: 'normal' | 'bold' | 'italic' | 'bold italic';
};

type rectAnnotation = annotationsCommon & {
  cornerRadius?: number;
};

type polygonAnnotation = annotationsCommon & {
  sides?: number;
};

type penAnnotation = annotationsCommon & {
  tension?: number;
  lineCap?: lineCap;
};

type lineAnnotation = annotationsCommon & {
  lineCap?: lineCap;
};

type arrowAnnotation = annotationsCommon & {
  lineCap?: lineCap;
  pointerLength?: number;
  pointerWidth?: number;
};

type rotateAnnotation = {
  angle?: number;
  componentType?: 'slider' | 'buttons';
};

type cropPresetItem = {
  titleKey: string;
  width?: number;
  height?: number;
  ratio?: string;
  descriptionKey?: string;
  icon?: string | HTMLElement | FunctionComponent;
  disableManualResize?: boolean;
};

type cropPresetGroup = {
  titleKey: string;
  items: cropPresetItem[];
};

type cropPresetFolder = {
  titleKey: string;
  groups: cropPresetGroup[];
  icon?: string | HTMLElement | FunctionComponent;
};

type imageDesignState = {
  imgSrc?: string;
  finetunes?: string[];
  finetunesProps?: {
    brightness?: number;
    contrast?: number;
    hue?: number;
    saturation?: number;
    value?: number;
    blurRadius?: number;
    warmth?: number;
  };
  filter?: string;
  adjustments?: {
    crop: {
      ratio: string;
      width?: number;
      height?: number;
      x?: number;
      y?: number;
      ratioFolderKey?: string;
      ratioGroupKey?: string;
      ratioTitleKey?: string;
    };
    isFlippedX?: boolean;
    isFlippedY?: boolean;
    rotation?: number;
  };
  annotations?: {
    [key?: string]: annotationsCommon &
      (
        | textAnnotation
        | rectAnnotation
        | polygonAnnotation
        | penAnnotation
        | lineAnnotation
        | arrowAnnotation
      ) & {
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
      };
  };
  resize?: {
    width?: number;
    height?: number;
    manualChangeDisabled?: boolean;
  };
  shownImageDimensions?: {
    width: number;
    height: number;
    scaledBy: number;
  };
};

type onSaveFunction = (
  savedImageData: savedImageData,
  imageDesignState: imageDesignState,
) => void | Promise;

export type getCurrentImgDataFunction = (
  imageFileInfo: {
    name?: string;
    extension?: string;
    quality?: number;
    size?: { width?: number; height?: number };
  },
  pixelRatio?: boolean | number,
  keepLoadingSpinnerShown?: boolean,
) => {
  imageData: savedImageData;
  designState: imageDesignState;
  hideLoadingSpinner: () => void;
};

type triggerSaveModalFn = (onSaveFunction) => void;
type triggerSavingFn = (onSaveFunction) => void;

type saveOption = {
  label: string;
  icon: string | HTMLElement | FunctionComponent;
  onClick: (triggerSaveModalFn, triggerSavingFn) => void;
};

export interface FilerobotImageEditorConfig {
  source: string | HTMLImageElement;
  annotationsCommon?: annotationsCommon;
  // [TOOLS_IDS.TEXT]
  Text?: textAnnotation & {
    fonts?: (string | { label: string; value: string })[];
    onFontChange?: (
      newFontFamily: string,
      reRenderCanvasFn: () => void,
    ) => void;
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
  // [TOOLS_IDS.ROTATE]:
  Rotate?: rotateAnnotation;
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
    ratioTitleKey?: string;
    presetsItems?: cropPresetItem[];
    presetsFolders?: cropPresetFolder[];
    autoResize?: boolean;
  };
  // TABS_IDS
  tabsIds?: availableTabs[] | [];
  defaultTabId?: availableTabs;
  defaultToolId?: availableTools;
  onBeforeSave?: (savedImageData: savedImageData) => void | boolean;
  onSave?: onSaveFunction;
  onClose?: (closeReason: closingReasons, haveNotSavedChanges: boolean) => void;
  closeAfterSave?: boolean;
  defaultSavedImageName?: string;
  defaultSavedImageType?: 'png' | 'jpeg' | 'webp';
  forceToPngInEllipticalCrop?: boolean;
  useBackendTranslations?: boolean;
  translations?: object;
  language?:
    | 'en'
    | 'fr'
    | 'de'
    | 'it'
    | 'pt'
    | 'es'
    | 'nl'
    | 'pl'
    | 'ro'
    | string;
  avoidChangesNotSavedAlertOnLeave?: boolean;
  loadableDesignState?: imageDesignState;
  showBackButton?: boolean;
  savingPixelRatio: number;
  previewPixelRatio: number;
  moreSaveOptions?: saveOption[];
  useCloudimage?: boolean;
  cloudimage?: {
    token: string;
    dontPrefixUrl?: boolean;
    domain?: string;
    version?: string;
    secureProtocol?: boolean;
    loadableQuery?: string;
    imageSealing?: {
      enable?: boolean;
      salt?: string;
      charCount?: number;
      includeParams?: string[];
    };
  };
  observePluginContainerSize?: boolean;
  showCanvasOnly?: boolean;
  getCurrentImgDataFnRef?:
    | RefObject
    | {
        current?: getCurrentImgDataFunction;
      };
  updateStateFnRef?:
    | RefObject
    | {
        current?: (newStatePart: {} | ((currentState: {}) => void)) => void;
      };
  onModify?: (currentImageDesignState: imageDesignState) => void;
  useZoomPresetsMenu?: boolean;
  disableZooming?: boolean;
}

declare const FilerobotImageEditor: FunctionComponent<FilerobotImageEditorConfig>;

export default FilerobotImageEditor;
export { TABS, TOOLS };

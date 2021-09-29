import addFilter, { ADD_FILTER } from './addFilter';
import hideLoader, { HIDE_LOADER } from './hideLoader';
import redo, { REDO } from './redo';
import reset, { RESET } from './reset';
import setError, { SET_ERROR } from './setError';
import showLoader, { SHOW_LOADER } from './showLoader';
import toggleSubTabSelection, {
  TOGGLE_SUB_TAB_SELECTION,
} from './toggleSubTabSelection';
import selectTab, { SELECT_TAB } from './selectTab';
import undo, { UNDO } from './undo';
import setFinetune, { SET_FINETUNE } from './setFinetune';
import addPreviewLayerRef, {
  ADD_PREVIEW_LAYER_REF,
} from './addPreviewLayerRef';
import setAnnotation, { SET_ANNOTATION } from './setAnnotation';
import changePointerMode, { CHANGE_POINTER_MODE } from './changePointerMode';
import selectAddedAnnotation, {
  SELECT_ADDED_ANNOTATION,
} from './selectAddedAnnotation';
import clearAnnotationsSelections, {
  CLEAR_ANNOTATIONS_SELECTIONS,
} from './clearAnnotationsSelections';
import toggleOriginalImageDisplay, {
  TOGGLE_ORIGINAL_IMAGE_DISPLAY,
} from './toggleOriginalImageDisplay';
import selectTool, { SELECT_TOOL } from './selectTool';
import toggleFlip, { TOGGLE_FLIP } from './toggleFlip';
import setCrop, { SET_CROP } from './setCrop';
import rotateCanvas, { ROTATE_CANVAS } from './rotateCanvas';
import zoomCanvas, { ZOOM_CANVAS } from './zoomCanvas';
import setCanvasSize, { SET_CANVAS_SIZE } from './setCanvasSize';
import setOriginalImage, { SET_ORIGINAL_IMAGE } from './setOriginalImage';
import setShownImageDimensions, {
  SET_SHOWN_IMAGE_DIMENSIONS,
} from './setShownImageDimensions';

export default {
  [SET_ORIGINAL_IMAGE]: setOriginalImage,
  [SET_ERROR]: setError,
  [SHOW_LOADER]: showLoader,
  [HIDE_LOADER]: hideLoader,
  [TOGGLE_SUB_TAB_SELECTION]: toggleSubTabSelection,
  [ADD_PREVIEW_LAYER_REF]: addPreviewLayerRef,
  [CHANGE_POINTER_MODE]: changePointerMode,
  [SELECT_ADDED_ANNOTATION]: selectAddedAnnotation,
  [CLEAR_ANNOTATIONS_SELECTIONS]: clearAnnotationsSelections,
  [TOGGLE_ORIGINAL_IMAGE_DISPLAY]: toggleOriginalImageDisplay,
  [SELECT_TAB]: selectTab,
  [SELECT_TOOL]: selectTool,
  [ZOOM_CANVAS]: zoomCanvas,
  [SET_CANVAS_SIZE]: setCanvasSize,
  [SET_SHOWN_IMAGE_DIMENSIONS]: setShownImageDimensions,
  // Start of Design actions...
  [ADD_FILTER]: addFilter,
  [SET_FINETUNE]: setFinetune,
  [SET_ANNOTATION]: setAnnotation,
  [SET_CROP]: setCrop,
  [ROTATE_CANVAS]: rotateCanvas,
  [TOGGLE_FLIP]: toggleFlip,
  // End of Design actions.
  [UNDO]: undo,
  [REDO]: redo,
  [RESET]: reset,
};

export {
  SET_ORIGINAL_IMAGE,
  SET_ERROR,
  SHOW_LOADER,
  HIDE_LOADER,
  TOGGLE_SUB_TAB_SELECTION,
  ADD_PREVIEW_LAYER_REF,
  CHANGE_POINTER_MODE,
  SELECT_ADDED_ANNOTATION,
  CLEAR_ANNOTATIONS_SELECTIONS,
  TOGGLE_ORIGINAL_IMAGE_DISPLAY,
  SELECT_TAB,
  SELECT_TOOL,
  ZOOM_CANVAS,
  SET_CANVAS_SIZE,
  SET_SHOWN_IMAGE_DIMENSIONS,
  // Start of Design actions...
  ADD_FILTER,
  SET_FINETUNE,
  SET_ANNOTATION,
  SET_CROP,
  ROTATE_CANVAS,
  TOGGLE_FLIP,
  // End of Design actions.
  UNDO,
  REDO,
  RESET,
};

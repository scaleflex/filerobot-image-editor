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
import setAnnotation, { SET_ANNOTATION } from './setAnnotation';
import changePointerIcon, { CHANGE_POINTER_ICON } from './changePointerIcon';
import selectAnnotation, { SELECT_ANNOTATION } from './selectAnnotation';
import clearAnnotationsSelections, {
  CLEAR_ANNOTATIONS_SELECTIONS,
} from './clearAnnotationsSelections';
import toggleOriginalImageDisplay, {
  TOGGLE_ORIGINAL_IMAGE_DISPLAY,
} from './toggleOriginalImageDisplay';
import selectTool, { SELECT_TOOL } from './selectTool';
import toggleFlip, { TOGGLE_FLIP } from './toggleFlip';
import setCrop, { SET_CROP } from './setCrop';
import changeRotation, { CHANGE_ROTATION } from './changeRotation';
import zoomCanvas, { ZOOM_CANVAS } from './zoomCanvas';
import setCanvasSize, { SET_CANVAS_SIZE } from './setCanvasSize';
import setOriginalImage, { SET_ORIGINAL_IMAGE } from './setOriginalImage';
import setShownImageDimensions, {
  SET_SHOWN_IMAGE_DIMENSIONS,
} from './setShownImageDimensions';
import deleteAnnotations, { DELETE_ANNOTATIONS } from './deleteAnnotations';
import enableTextContentEdit, {
  ENABLE_TEXT_CONTENT_EDIT,
} from './enableTextContentEdit';

export default {
  [SET_ORIGINAL_IMAGE]: setOriginalImage,
  [SET_ERROR]: setError,
  [SHOW_LOADER]: showLoader,
  [HIDE_LOADER]: hideLoader,
  [TOGGLE_SUB_TAB_SELECTION]: toggleSubTabSelection,
  [CHANGE_POINTER_ICON]: changePointerIcon,
  [SELECT_ANNOTATION]: selectAnnotation,
  [CLEAR_ANNOTATIONS_SELECTIONS]: clearAnnotationsSelections,
  [TOGGLE_ORIGINAL_IMAGE_DISPLAY]: toggleOriginalImageDisplay,
  [SELECT_TAB]: selectTab,
  [SELECT_TOOL]: selectTool,
  [ZOOM_CANVAS]: zoomCanvas,
  [SET_CANVAS_SIZE]: setCanvasSize,
  [SET_SHOWN_IMAGE_DIMENSIONS]: setShownImageDimensions,
  [ENABLE_TEXT_CONTENT_EDIT]: enableTextContentEdit,
  // Start of Design actions...
  [ADD_FILTER]: addFilter,
  [SET_FINETUNE]: setFinetune,
  [SET_ANNOTATION]: setAnnotation,
  [SET_CROP]: setCrop,
  [CHANGE_ROTATION]: changeRotation,
  [TOGGLE_FLIP]: toggleFlip,
  [DELETE_ANNOTATIONS]: deleteAnnotations,
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
  CHANGE_POINTER_ICON,
  SELECT_ANNOTATION,
  CLEAR_ANNOTATIONS_SELECTIONS,
  TOGGLE_ORIGINAL_IMAGE_DISPLAY,
  SELECT_TAB,
  SELECT_TOOL,
  ZOOM_CANVAS,
  SET_CANVAS_SIZE,
  SET_SHOWN_IMAGE_DIMENSIONS,
  ENABLE_TEXT_CONTENT_EDIT,
  // Start of Design actions...
  ADD_FILTER,
  SET_FINETUNE,
  SET_ANNOTATION,
  SET_CROP,
  CHANGE_ROTATION,
  TOGGLE_FLIP,
  DELETE_ANNOTATIONS,
  // End of Design actions.
  UNDO,
  REDO,
  RESET,
};

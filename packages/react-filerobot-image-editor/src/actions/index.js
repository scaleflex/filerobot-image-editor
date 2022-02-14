import addFilter, { ADD_FILTER } from './addFilter';
import hideLoader, { HIDE_LOADER } from './hideLoader';
import redo, { REDO } from './redo';
import reset, { RESET } from './reset';
import setFeedback, { SET_FEEDBACK } from './setFeedback';
import showLoader, { SHOW_LOADER } from './showLoader';
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
import removeAnnotations, { REMOVE_ANNOTATIONS } from './removeAnnotations';
import duplicateAnnotations, {
  DUPLICATE_ANNOTATIONS,
} from './duplicateAnnotations';
import enableTextContentEdit, {
  ENABLE_TEXT_CONTENT_EDIT,
} from './enableTextContentEdit';
import setResize, { SET_RESIZE } from './setResize';
import setSaved, { SET_SAVED } from './setSaved';
import updateState, { UPDATE_STATE } from './updateState';
import setLatestColor, { SET_LATEST_COLOR } from './setLatestColor';

export default {
  [SET_ORIGINAL_IMAGE]: setOriginalImage,
  [SET_FEEDBACK]: setFeedback,
  [SHOW_LOADER]: showLoader,
  [HIDE_LOADER]: hideLoader,
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
  [SET_LATEST_COLOR]: setLatestColor,
  // Start of Design actions...
  [ADD_FILTER]: addFilter,
  [SET_FINETUNE]: setFinetune,
  [SET_ANNOTATION]: setAnnotation,
  [SET_CROP]: setCrop,
  [CHANGE_ROTATION]: changeRotation,
  [TOGGLE_FLIP]: toggleFlip,
  [SET_RESIZE]: setResize,
  [REMOVE_ANNOTATIONS]: removeAnnotations,
  [DUPLICATE_ANNOTATIONS]: duplicateAnnotations,
  // End of Design actions.
  [UNDO]: undo,
  [REDO]: redo,
  [RESET]: reset,
  [SET_SAVED]: setSaved,
  [UPDATE_STATE]: updateState,
};

export {
  SET_ORIGINAL_IMAGE,
  SET_FEEDBACK,
  SHOW_LOADER,
  HIDE_LOADER,
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
  SET_LATEST_COLOR,
  // Start of Design actions...
  ADD_FILTER,
  SET_FINETUNE,
  SET_ANNOTATION,
  SET_CROP,
  CHANGE_ROTATION,
  TOGGLE_FLIP,
  SET_RESIZE,
  REMOVE_ANNOTATIONS,
  DUPLICATE_ANNOTATIONS,
  // End of Design actions.
  UNDO,
  REDO,
  RESET,
  SET_SAVED,
  UPDATE_STATE,
};

import { CANVAS_ID, ORIGINAL_CANVAS_ID } from "../config";

export const getCanvasNode = (editorWrapperId, id, originalCanvas = false) => (
  window.document.querySelector(`#${editorWrapperId}_${id || (originalCanvas ? ORIGINAL_CANVAS_ID : CANVAS_ID)}`)
);
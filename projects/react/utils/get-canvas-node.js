import { CANVAS_ID, ORIGINAL_CANVAS_ID } from "../config";

export const getCanvasNode = (id, originalCanvas = false) => (
  window.document.getElementById(id || (originalCanvas ? ORIGINAL_CANVAS_ID : CANVAS_ID))
);
import { POINTER_MODES } from '../utils/constants';

const defaultState = {
  tab: null,
  subTab: null,
  canvas: null,
  canvasDimensions: null,
  imageLayer: null, // for having the image and applying filters
  designLayer: null, // for having the other tools for editing ex. shapes, drawing...etc.
  transformer: null, // contains the transfomrations
  selections: [], // the objects/shapes selected that would be transformed
  canvasedImage: null, // Instance of Konva to the provided image
  finetune: {},
  filters: {},
  adjust: {},
  watermark: {},
  annotate: {},
  tmpAnnotate: null, // the annotate would be drawn currently then moved to annotate after being drawn
  pointerMode: POINTER_MODES.DRAW, // Determines the mode of the pointer whether to select some shape to modify or to draw on the canvas
}

export default defaultState;

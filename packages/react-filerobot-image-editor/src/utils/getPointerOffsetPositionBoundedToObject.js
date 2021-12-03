/** Internal Dependencies */
import restrictNumber from './restrictNumber';

/**
 * Gets the touch/mouse position relative to the passed object to be considred as offset X/Y.
 *
 * @param {Object} previewGroup - The preview group that is a direct child of the design layer
 * @param {Object} relativeToObject - The object to be considered as parent element
 *                                    contains left, top, width & height relative to the document.
 * @returns {Object} both X & Y offset values.
 */
const getPointerOffsetPositionBoundedToObject = (
  previewGroup = {},
  relativeToObject = {},
) => {
  const designLayer = previewGroup.parent;
  const canvas = designLayer.getStage();
  const canvasZoomFactor = canvas.attrs.zoomFactor;
  const pos = designLayer.getRelativePointerPosition();

  return {
    offsetX:
      restrictNumber(
        pos.x,
        0,
        relativeToObject.width / (canvas.scaleX() / canvasZoomFactor),
      ) + designLayer.attrs.xPadding,
    offsetY:
      restrictNumber(
        pos.y,
        0,
        relativeToObject.height / (canvas.scaleY() / canvasZoomFactor),
      ) + designLayer.attrs.yPadding,
  };
};

export default getPointerOffsetPositionBoundedToObject;

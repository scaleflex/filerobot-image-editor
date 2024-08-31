/**
 * Gets the touch/mouse position relative to the passed object to be considred as offset X/Y.
 *
 * @param {Object} previewGroup - The preview group that is a direct child of the design layer
 * @returns {Object} both X & Y offset values.
 */
const getPointerOffsetPosition = (previewGroup = {}) => {
  const designLayer = previewGroup?.parent;
  const pos = designLayer.getRelativePointerPosition();

  return {
    offsetX: pos.x + (designLayer?.attrs.xPadding || 0),
    offsetY: pos.y + (designLayer?.attrs.yPadding || 0),
  };
};

export default getPointerOffsetPosition;

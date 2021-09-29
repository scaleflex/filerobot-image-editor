/** Internal Dependencies */
import restrictNumber from './restrictNumber';

/**
 * Gets the touch/mouse position relative to the passed object to be considred as offset X/Y
 * as offset isn't supported in touch events.
 *
 * @param {Object} e - The pointer (mouse/touch) event contains pageX & pageY.
 * @param {Object} relativeToObject - The object to be considered as parent element
 *                                    contains left, top, width & height relative to the document.
 * @returns {Object} both X & Y offset values.
 */
const getPointerOffsetPositionBoundedToObject = (
  e = {},
  relativeToObject = {},
) => {
  const pointerPositionEvent =
    e.evt?.touches?.[0] || e.touches?.[0] || e.evt || e;

  return {
    offsetX: restrictNumber(
      pointerPositionEvent.pageX - relativeToObject.left,
      0,
      relativeToObject.width,
    ),
    offsetY: restrictNumber(
      pointerPositionEvent.pageY - relativeToObject.top,
      0,
      relativeToObject.height,
    ),
  };
};

export default getPointerOffsetPositionBoundedToObject;

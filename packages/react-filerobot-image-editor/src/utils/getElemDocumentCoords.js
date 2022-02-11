/** Internal Dependencies */
import getScrollOffset from './getScrollOffset';

const getElemDocumentCoords = (elem) => {
  if (!elem) {
    return null;
  }
  const box = elem.getBoundingClientRect();

  const { body } = document;
  const { topOffset, leftOffset } = getScrollOffset();

  const docEl = document.documentElement;
  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top = box.top + topOffset - clientTop;
  const left = box.left + leftOffset - clientLeft;

  return {
    top: Math.round(top),
    left: Math.round(left),
    width: box.width,
    height: box.height,
  };
};

export default getElemDocumentCoords;

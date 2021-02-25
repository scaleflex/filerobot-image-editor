
export const getInnerBoxSize = (parentElem, originalImg) => {
  const parentElemRect = parentElem.getBoundingClientRect();
  const {
    paddingLeft = 0, paddingRight = 0, paddingTop = 0, paddingBottom = 0
  } = window.getComputedStyle(parentElem) || {};
  const pWidth = parentElemRect.width - (parseInt(paddingLeft, 10) || 0) - (parseInt(paddingRight, 10) || 0);
  const pHeight = parentElemRect.height - (parseInt(paddingTop, 10) || 0) - (parseInt(paddingBottom, 10) || 0);
  let width = 0;
  let height = 0;

  if (pWidth >= originalImg.width && pHeight >= originalImg.height) {
    width = originalImg.width;
    height = originalImg.height;
  } else if (pWidth > originalImg.width && pHeight < originalImg.height) {
    height = pHeight;
    width = pHeight * originalImg.ratio;
  } else if (pWidth < originalImg.width && pHeight > originalImg.height) {
    width = pWidth;
    height = pWidth / originalImg.ratio;
  } else {
    const w1 = pWidth;
    const h1 = pWidth / originalImg.ratio;
    const w2 = pHeight * originalImg.ratio;
    const h2 = pHeight;

    if (originalImg.width <= w1 && originalImg.height <= h1) {
      width = w1;
      height = h1;
    } else {
      width = w2;
      height = h2;
    }
  }

  return {width, height};
}
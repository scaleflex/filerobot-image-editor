const getScrollOffset = () => {
  const { body } = document;
  const docEl = document.documentElement;

  const scrollTop = window?.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window?.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  return {
    topOffset: scrollTop,
    leftOffset: scrollLeft,
  };
};

export default getScrollOffset;

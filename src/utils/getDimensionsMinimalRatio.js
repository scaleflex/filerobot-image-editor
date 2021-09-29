const getDimensionsMinimalRatio = (
  firstWidth,
  firstHeight,
  secondWidth,
  secondHeight,
) => {
  const widthScale = firstWidth / secondWidth;
  const heightScale = firstHeight / secondHeight;

  return Math.min(widthScale, heightScale) || 1;
};

export default getDimensionsMinimalRatio;

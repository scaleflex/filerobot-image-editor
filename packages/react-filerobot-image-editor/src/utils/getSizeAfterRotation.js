const getSizeAfterRotation = (width, height, rotationAngleInDegree = 0) => {
  const absRotationAngleInDegree = Math.abs(rotationAngleInDegree);
  const roundedDegree = Math.round(rotationAngleInDegree);
  const isGreaterThan90Degree = absRotationAngleInDegree > 90;
  const currentAbsRotationAngleInDegree = isGreaterThan90Degree
    ? absRotationAngleInDegree - 90
    : absRotationAngleInDegree;
  const currentWidth = isGreaterThan90Degree ? height : width;
  const currentHeight = isGreaterThan90Degree ? width : height;
  const radianAngle = (currentAbsRotationAngleInDegree * Math.PI) / 180;
  const sin = Math.abs(Math.sin(radianAngle));
  const cos = Math.abs(Math.cos(radianAngle));
  const getLeftOffset = () =>
    roundedDegree > 90
      ? currentWidth * cos + currentHeight * sin
      : currentHeight * sin;
  const getTopOffset = () => {
    if (roundedDegree < 0 && roundedDegree > -90) {
      return currentWidth * sin;
    }
    if (roundedDegree > 90) {
      return currentWidth * sin;
    }
    return currentHeight * cos + currentWidth * sin;
  };

  return {
    width: Math.round(currentWidth * cos) + Math.round(currentHeight * sin),
    height: Math.round(currentWidth * sin) + Math.round(currentHeight * cos),
    offsetTop: roundedDegree >= 0 && roundedDegree <= 90 ? 0 : getTopOffset(),
    offsetLeft:
      roundedDegree <= 0 && roundedDegree >= -90 ? 0 : getLeftOffset(),
  };
};

export default getSizeAfterRotation;

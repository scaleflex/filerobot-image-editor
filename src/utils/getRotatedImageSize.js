const getRotatedImageSize = (width, height, rotationAngleInDegree = 0) => {
  const absRotationAngleInDegree = Math.abs(rotationAngleInDegree);
  const isGreaterThan90Degree = absRotationAngleInDegree > 90;
  const currentAbsRotationAngleInDegree = isGreaterThan90Degree
    ? absRotationAngleInDegree - 90
    : absRotationAngleInDegree;
  const currentWidth = isGreaterThan90Degree ? height : width;
  const currentHeight = isGreaterThan90Degree ? width : height;
  const radianAngle = (currentAbsRotationAngleInDegree * Math.PI) / 180;
  const sin = Math.abs(Math.sin(radianAngle));
  const cos = Math.abs(Math.cos(radianAngle));

  return {
    width: Math.round(currentWidth * cos) + Math.round(currentHeight * sin),
    height: Math.round(currentWidth * sin) + Math.round(currentHeight * cos),
  };
};

export default getRotatedImageSize;

const getRotatedImageSize = (width, height, rotationAngleInDegree = 0) => {
  const radianAngle = (rotationAngleInDegree * Math.PI) / 180;
  const sin = Math.abs(
    Math.sin(radianAngle),
  );
  const cos = Math.abs(
    Math.cos(radianAngle),
  );

  return {
    width: (width * cos) + (height * sin),
    height: (width * sin) + (height * cos),
  };
};

export default getRotatedImageSize;

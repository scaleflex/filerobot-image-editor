const calcLineDimensionProps = ({ startX, startY, endX, endY }) => {
  const points = [
    startX, startY,
    endX, endY
  ];// As this will be straight line we would need 2X and 2Y only.

  return {
    x: 0,
    y: 0,
    points,
  }
}

export default calcLineDimensionProps;

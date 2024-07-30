const mapNumber = (number, oldMin, oldMax, newMin, newMax) =>
  typeof number === 'number' &&
  ((number - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;

export default mapNumber;

const mapNumber = (number, oldMin, oldMax, newMin, newMax) =>
  ((number - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;

export default mapNumber;

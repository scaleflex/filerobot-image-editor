const toPrecisedFloat = (number, precision = 5) =>
  +parseFloat(number).toFixed(precision);

export default toPrecisedFloat;

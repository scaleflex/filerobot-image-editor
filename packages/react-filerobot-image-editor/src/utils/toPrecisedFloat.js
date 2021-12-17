const toPrecisedFloat = (number, precision = 5) =>
  number && +parseFloat(number).toFixed(precision);

export default toPrecisedFloat;

import toPrecisedFloat from './toPrecisedFloat';

const compareRatios = (ratio1, ratio2) =>
  toPrecisedFloat(ratio1) === toPrecisedFloat(ratio2);

export default compareRatios;

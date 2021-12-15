import toPrecisedFloat from './toPrecisedFloat';

const toAbsolute = (percent, total) =>
  toPrecisedFloat((percent / 100) * total, 2);

export default toAbsolute;

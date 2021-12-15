import toPrecisedFloat from './toPrecisedFloat';

const toPercent = (part, total) => toPrecisedFloat((part / total) * 100, 2);

export default toPercent;

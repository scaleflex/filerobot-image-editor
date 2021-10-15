const getRoundedPercentange = (number = 0, total = 100) =>
  Math.round((number / total) * 100);

export default getRoundedPercentange;

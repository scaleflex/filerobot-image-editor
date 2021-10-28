const restrictNumber = (number, min = 0, max = 1000000) => {
  const convertedNumber = +number;

  return Math.min(Math.max(min, convertedNumber), max);
};

export default restrictNumber;

const restrictNumber = (number, min, max) => {
  const convertedNumber = +number;

  return Math.min(Math.max(min, convertedNumber), max);
};

export default restrictNumber;

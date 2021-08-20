const restrictNumber = (number, min, max) => {
  const convertedNumber = +number;

  if (convertedNumber < +min) {
    return +min;
  }

  if (convertedNumber > +max) {
    return +max;
  }

  return convertedNumber;
};

export default restrictNumber;

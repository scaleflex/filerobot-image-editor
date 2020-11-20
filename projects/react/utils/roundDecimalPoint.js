export const roundDecimalPoint = (number, numbersAfterDecimalToHave = 2) => (
  parseFloat(number).toFixed(numbersAfterDecimalToHave)
)

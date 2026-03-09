const BASE_FONT_SIZE = 16;
const REFERENCE_SIZE = 500;
const SCALING_EXPONENT = 5 / 6;
const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 120;

const getScaledFontSize = (width, height) => {
  if (!width || !height) {
    return BASE_FONT_SIZE;
  }

  const averageSize = (width + height) / 2;
  const scaled = Math.round(
    BASE_FONT_SIZE * (averageSize / REFERENCE_SIZE) ** SCALING_EXPONENT,
  );

  return Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, scaled));
};

export default getScaledFontSize;

const BaseFilters = {
  brightness: (pixelRGB, value) => {
    let currentValue = value;
    currentValue = currentValue > 1 ? 1 : currentValue;
    currentValue = currentValue < -1 ? -1 : currentValue;
    // eslint-disable-next-line no-bitwise
    currentValue = ~~(255 * currentValue);
    return [
      pixelRGB[0] + currentValue,
      pixelRGB[1] + currentValue,
      pixelRGB[2] + currentValue,
    ];
  },
  contrast: (pixelRGB, value) => {
    let currentValue = value;
    currentValue *= 255;
    const factor = (259 * (currentValue + 255)) / (255 * (259 - currentValue));
    return [
      factor * (pixelRGB[0] - 128) + 128,
      factor * (pixelRGB[1] - 128) + 128,
      factor * (pixelRGB[2] - 128) + 128,
    ];
  },
  saturation: (pixelRGB, value) => {
    let currentValue = value;
    currentValue = currentValue < -1 ? -1 : currentValue;
    const r = pixelRGB[0];
    const g = pixelRGB[1];
    const b = pixelRGB[2];

    const gray = 0.2989 * r + 0.587 * g + 0.114 * b; // weights from CCIR 601 spec
    return [
      -gray * currentValue + r * (1 + currentValue),
      -gray * currentValue + g * (1 + currentValue),
      -gray * currentValue + b * (1 + currentValue),
    ];
  },
  grayscale: (pixelRGB) => {
    const r = pixelRGB[0];
    const g = pixelRGB[1];
    const b = pixelRGB[2];

    const average = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return new Array(3).fill(average);
  },
  sepia: (pixelRGB, value) => {
    const r = pixelRGB[0];
    const g = pixelRGB[1];
    const b = pixelRGB[2];

    return [
      r * (1 - 0.607 * value) + g * 0.769 * value + b * 0.189 * value,
      r * 0.349 * value + g * (1 - 0.314 * value) + b * 0.168 * value,
      r * 0.272 * value + g * 0.534 * value + b * (1 - 0.869 * value),
    ];
  },
  adjustRGB: (pixelRGB, adjustingRGB) => [
    pixelRGB[0] * adjustingRGB[0], // R
    pixelRGB[1] * adjustingRGB[1], // G
    pixelRGB[2] * adjustingRGB[2], // B
  ],
  // RGBV => [R, G, B, Value]
  colorFilter: (pixelRGB, colorRGBV) => {
    const r = pixelRGB[0];
    const g = pixelRGB[1];
    const b = pixelRGB[2];
    const value = colorRGBV[3];

    return [
      r - (r - colorRGBV[0]) * value,
      g - (g - colorRGBV[1]) * value,
      b - (b - colorRGBV[2]) * value,
    ];
  },
};

export default BaseFilters;

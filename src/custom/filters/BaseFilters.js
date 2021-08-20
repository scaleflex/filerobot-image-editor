const BaseFilters = {
  brightness: (pixelRGB, value) => {
    value = value > 1 ? 1 : value;
    value = value < -1 ? -1 : value;
    value = ~~(255 * value);
    return [
      pixelRGB[0] + value,
      pixelRGB[1] + value,
      pixelRGB[2] + value,
    ];
  },
  contrast: (pixelRGB, value) => {
    value *= 255;
    const factor = 259 * (value + 255) / (255 * (259 - value));
    return [
      factor * (pixelRGB[0] - 128) + 128,
      factor * (pixelRGB[1] - 128) + 128,
      factor * (pixelRGB[2] - 128) + 128,
    ];
  },
  saturation: (pixelRGB, value) => {
    value = value < -1 ? -1 : value;
    const r = pixelRGB[0];
    const g = pixelRGB[1];
    const b = pixelRGB[2];

    const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b; // weights from CCIR 601 spec
    return [
      -gray * value + r * (1 + value),
      -gray * value + g * (1 + value),
      -gray * value + b * (1 + value),
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
      r - (
        (r - colorRGBV[0]) * value
      ),
      g - (
        (g - colorRGBV[1]) * value
      ),
      b - (
        (b - colorRGBV[2]) * value
      ),
    ];
  },
};

export default BaseFilters;

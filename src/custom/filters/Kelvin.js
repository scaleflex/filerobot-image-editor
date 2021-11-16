import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [255, 140, 0, 0.1];
const ADJUST_RGB_CONST = [1.15, 1.05, 1];
const SATURATION_CONST = 0.35;

/**
 * Kelvin Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Kelvin]);
 */
function Kelvin(imageData) {
  const pixels = imageData.data; //  [0, 1, 2, 3,...] => [r, g, b, a, ...]
  const len = pixels.length;

  for (let i = 0; i < len; i += 4) {
    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.colorFilter(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      COLOR_FILTER_CONST,
    );

    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.adjustRGB(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      ADJUST_RGB_CONST,
    );

    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.saturation(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      SATURATION_CONST,
    );
  }
}

export default Kelvin;

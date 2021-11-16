import BaseFilters from './BaseFilters';

const SATURATION_CONST = 0.35;
const BRIGHTNESS_CONST = 0.1;

/**
 * Skyline Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Skyline]);
 */
function Skyline(imageData) {
  const pixels = imageData.data; //  [0, 1, 2, 3,...] => [r, g, b, a, ...]
  const len = pixels.length;

  for (let i = 0; i < len; i += 4) {
    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.saturation(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      SATURATION_CONST,
    );

    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.brightness(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      BRIGHTNESS_CONST,
    );
  }
}

export default Skyline;

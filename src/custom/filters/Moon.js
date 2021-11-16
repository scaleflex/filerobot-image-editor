import BaseFilters from './BaseFilters';

const BRIGHTNESS_CONST = 0.1;

/**
 * Moon Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Moon]);
 */
function Moon(imageData) {
  const pixels = imageData.data; //  [0, 1, 2, 3,...] => [r, g, b, a, ...]
  const len = pixels.length;

  for (let i = 0; i < len; i += 4) {
    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.grayscale([
      pixels[i],
      pixels[i + 1],
      pixels[i + 2],
    ]);
    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.brightness(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      BRIGHTNESS_CONST,
    );
  }
}

export default Moon;

import BaseFilters from './BaseFilters';

const BRIGHTNESS_CONST = 0.1;
const COLOR_FILTER_CONST = [255, 255, 0, 0.2];

/**
 * Walden Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Walden]);
 */
function Walden(imageData) {
  const pixels = imageData.data; //  [0, 1, 2, 3,...] => [r, g, b, a, ...]
  const len = pixels.length;

  for (let i = 0; i < len; i += 4) {
    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.brightness(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      BRIGHTNESS_CONST,
    );

    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.colorFilter(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      COLOR_FILTER_CONST,
    );
  }
}

export default Walden;

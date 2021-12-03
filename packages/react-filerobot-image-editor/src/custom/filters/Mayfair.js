import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [230, 115, 108, 0.05];
const SATURATION_CONST = 0.15;

/**
 * Mayfair Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Mayfair]);
 */
function Mayfair(imageData) {
  const pixels = imageData.data; //  [0, 1, 2, 3,...] => [r, g, b, a, ...]
  const len = pixels.length;

  for (let i = 0; i < len; i += 4) {
    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.colorFilter(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      COLOR_FILTER_CONST,
    );
    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.saturation(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      SATURATION_CONST,
    );
  }
}

export default Mayfair;

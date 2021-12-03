import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [255, 165, 40, 0.2];

/**
 * Earlybird Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Earlybird]);
 */
function Earlybird(imageData) {
  const pixels = imageData.data; //  [0, 1, 2, 3,...] => [r, g, b, a, ...]
  const len = pixels.length;

  for (let i = 0; i < len; i += 4) {
    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.colorFilter(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      COLOR_FILTER_CONST,
    );
  }
}

export default Earlybird;

import BaseFilters from './BaseFilters';

const ADJUST_RGB_CONST = [1.05, 1.1, 1];

/**
 * Perpetua Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Perpetua]);
 */
function Perpetua(imageData) {
  const pixels = imageData.data; //  [0, 1, 2, 3,...] => [r, g, b, a, ...]
  const len = pixels.length;

  for (let i = 0; i < len; i += 4) {
    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.adjustRGB(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      ADJUST_RGB_CONST,
    );
  }
}

export default Perpetua;

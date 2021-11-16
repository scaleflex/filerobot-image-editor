import BaseFilters from './BaseFilters';

const SEPIA_CONST = 0.04;
const CONTRAST_CONST = -0.15;

/**
 * Gingham Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Gingham]);
 */
function Gingham(imageData) {
  const pixels = imageData.data; //  [0, 1, 2, 3,...] => [r, g, b, a, ...]
  const len = pixels.length;

  for (let i = 0; i < len; i += 4) {
    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.sepia(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      SEPIA_CONST,
    );

    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.contrast(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      CONTRAST_CONST,
    );
  }
}

export default Gingham;

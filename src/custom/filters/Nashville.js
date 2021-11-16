import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [220, 115, 188, 0.12];
const CONTRAST_CONST = -0.05;

/**
 * Nashville Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Nashville]);
 */
function Nashville(imageData) {
  const pixels = imageData.data; //  [0, 1, 2, 3,...] => [r, g, b, a, ...]
  const len = pixels.length;

  for (let i = 0; i < len; i += 4) {
    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.colorFilter(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      COLOR_FILTER_CONST,
    );

    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.contrast(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      CONTRAST_CONST,
    );
  }
}

export default Nashville;

import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [25, 240, 252, 0.05];
const SEPIA_CONST = 0.3;

/**
 * Brooklyn Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Brooklyn]);
 */
function Brooklyn(imageData) {
  const pixels = imageData.data; //  [0, 1, 2, 3,...] => [r, g, b, a, ...]
  const len = pixels.length;

  for (let i = 0; i < len; i += 4) {
    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.colorFilter(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      COLOR_FILTER_CONST,
    );

    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.sepia(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      SEPIA_CONST,
    );
  }
}

export default Brooklyn;

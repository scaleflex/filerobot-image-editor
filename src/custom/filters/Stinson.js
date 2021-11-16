import BaseFilters from './BaseFilters';

const BRIGHTNESS_CONST = 0.1;
const SEPIA_CONST = 0.3;

/**
 * Stinson Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Stinson]);
 */
function Stinson(imageData) {
  const pixels = imageData.data; //  [0, 1, 2, 3,...] => [r, g, b, a, ...]
  const len = pixels.length;

  for (let i = 0; i < len; i += 4) {
    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.brightness(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      BRIGHTNESS_CONST,
    );

    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.sepia(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      SEPIA_CONST,
    );
  }
}

export default Stinson;

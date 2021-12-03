import BaseFilters from './BaseFilters';

const ADJUST_RGB_CONST = [1, 1, 1.25];
const CONTRAST_CONST = 0.1;
const BRIGHTNESS_CONST = 0.15;

/**
 * Hudson Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Hudson]);
 */
function Hudson(imageData) {
  const pixels = imageData.data; //  [0, 1, 2, 3,...] => [r, g, b, a, ...]
  const len = pixels.length;

  for (let i = 0; i < len; i += 4) {
    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.adjustRGB(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      ADJUST_RGB_CONST,
    );

    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.contrast(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      CONTRAST_CONST,
    );

    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.brightness(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      BRIGHTNESS_CONST,
    );
  }
}

export default Hudson;

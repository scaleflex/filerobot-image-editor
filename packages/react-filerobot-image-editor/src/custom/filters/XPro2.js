import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [255, 255, 0, 0.07];
const SATURATION_CONST = 0.2;
const CONTRAST_CONST = 0.15;

/**
 * XPro2 Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([XPro2]);
 */
function XPro2(imageData) {
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

    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.contrast(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      CONTRAST_CONST,
    );
  }
}

export default XPro2;

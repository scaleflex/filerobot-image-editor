import BaseFilters from './BaseFilters';

const CONTRAST_CONST = 0.15;
const SATURATION_CONST = 0.2;

/**
 * LoFi Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([LoFi]);
 */
function LoFi(imageData) {
  const pixels = imageData.data; //  [0, 1, 2, 3,...] => [r, g, b, a, ...]
  const len = pixels.length;

  for (let i = 0; i < len; i += 4) {
    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.contrast(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      CONTRAST_CONST,
    );

    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.saturation(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      SATURATION_CONST,
    );
  }
}

export default LoFi;

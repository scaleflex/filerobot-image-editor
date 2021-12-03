import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [255, 225, 0, 0.05];
const BRIGHTNESS_CONST = 0.06;
const CONTRAST_CONST = 0.06;

/**
 * Vesper Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Vesper]);
 */
function Vesper(imageData) {
  const pixels = imageData.data; //  [0, 1, 2, 3,...] => [r, g, b, a, ...]
  const len = pixels.length;

  for (let i = 0; i < len; i += 4) {
    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.colorFilter(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      COLOR_FILTER_CONST,
    );

    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.brightness(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      BRIGHTNESS_CONST,
    );

    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.contrast(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      CONTRAST_CONST,
    );
  }
}

export default Vesper;

import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [100, 28, 210, 0.03];
const BRIGHTNESS_CONST = 0.1;

/**
 * Willow Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Willow]);
 */
function Willow(imageData) {
  const pixels = imageData.data; //  [0, 1, 2, 3,...] => [r, g, b, a, ...]
  const len = pixels.length;

  for (let i = 0; i < len; i += 4) {
    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.grayscale([
      pixels[i],
      pixels[i + 1],
      pixels[i + 2],
    ]);

    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.colorFilter(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      COLOR_FILTER_CONST,
    );

    [pixels[i], pixels[i + 1], pixels[i + 2]] = BaseFilters.brightness(
      [pixels[i], pixels[i + 1], pixels[i + 2]],
      BRIGHTNESS_CONST,
    );
  }
}

Willow.filterName = 'Willow'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Willow;

import BaseFilters from './BaseFilters';

const SEPIA_CONST = 0.4;
const BRIGHTNESS_CONST = 0.13;
const CONTRAST_CONST = -0.05;

/**
 * Reyes Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Reyes]);
 */
function Reyes(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.sepia(SEPIA_CONST),
    BaseFilters.brightness(BRIGHTNESS_CONST),
    BaseFilters.contrast(CONTRAST_CONST),
  );
}

Reyes.filterName = 'Reyes'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Reyes;

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
  BaseFilters.apply(
    imageData,
    BaseFilters.brightness(BRIGHTNESS_CONST),
    BaseFilters.sepia(SEPIA_CONST),
  );
}

Stinson.filterName = 'Stinson'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Stinson;

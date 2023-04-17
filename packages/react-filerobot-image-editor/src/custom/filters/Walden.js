import BaseFilters from './BaseFilters';

const BRIGHTNESS_CONST = 0.1;
const COLOR_FILTER_CONST = [255, 255, 0, 0.2];

/**
 * Walden Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Walden]);
 */
function Walden(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.brightness(BRIGHTNESS_CONST),
    BaseFilters.colorFilter(COLOR_FILTER_CONST),
  );
}

Walden.filterName = 'Walden'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Walden;

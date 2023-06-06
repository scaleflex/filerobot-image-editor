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
  BaseFilters.apply(
    imageData,
    BaseFilters.grayscale(),
    BaseFilters.colorFilter(COLOR_FILTER_CONST),
    BaseFilters.brightness(BRIGHTNESS_CONST),
  );
}

Willow.filterName = 'Willow'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Willow;

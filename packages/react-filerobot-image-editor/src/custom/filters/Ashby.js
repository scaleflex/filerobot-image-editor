import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [255, 160, 25, 0.1];
const BRIGHTNESS_CONST = 0.1;

/**
 * Ashby Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Ashby]);
 */
function Ashby(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.colorFilter(COLOR_FILTER_CONST),
    BaseFilters.brightness(BRIGHTNESS_CONST),
  );
}

Ashby.filterName = 'Ashby'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Ashby;

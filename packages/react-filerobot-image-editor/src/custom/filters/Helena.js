import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [208, 208, 86, 0.2];
const CONTRAST_CONST = 0.15;

/**
 * Helena Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Helena]);
 */
function Helena(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.colorFilter(COLOR_FILTER_CONST),
    BaseFilters.contrast(CONTRAST_CONST),
  );
}

Helena.filterName = 'Helena'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Helena;

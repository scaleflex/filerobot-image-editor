import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [225, 240, 0, 0.1];
const SATURATION_CONST = 0.25;
const CONTRAST_CONST = 0.05;

/**
 * Maven Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Maven]);
 */
function Maven(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.colorFilter(COLOR_FILTER_CONST),
    BaseFilters.saturation(SATURATION_CONST),
    BaseFilters.contrast(CONTRAST_CONST),
  );
}

Maven.filterName = 'Maven'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Maven;

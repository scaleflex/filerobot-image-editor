import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [255, 140, 0, 0.1];
const ADJUST_RGB_CONST = [1.15, 1.05, 1];
const SATURATION_CONST = 0.35;

/**
 * Kelvin Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Kelvin]);
 */
function Kelvin(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.colorFilter(COLOR_FILTER_CONST),
    BaseFilters.adjustRGB(ADJUST_RGB_CONST),
    BaseFilters.saturation(SATURATION_CONST),
  );
}

Kelvin.filterName = 'Kelvin'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Kelvin;

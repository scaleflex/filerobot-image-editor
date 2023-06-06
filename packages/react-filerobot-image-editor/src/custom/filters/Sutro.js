import BaseFilters from './BaseFilters';

const BRIGHTNESS_CONST = -0.1;
const SATURATION_CONST = -0.1;

/**
 * Sutro Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Sutro]);
 */
function Sutro(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.brightness(BRIGHTNESS_CONST),
    BaseFilters.saturation(SATURATION_CONST),
  );
}

Sutro.filterName = 'Sutro'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Sutro;

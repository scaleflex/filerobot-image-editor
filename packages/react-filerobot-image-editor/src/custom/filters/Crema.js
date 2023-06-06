import BaseFilters from './BaseFilters';

const ADJUST_RGB_CONST = [1.04, 1, 1.02];
const SATURATION_CONST = -0.05;

/**
 * Crema Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Crema]);
 */
function Crema(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.adjustRGB(ADJUST_RGB_CONST),
    BaseFilters.saturation(SATURATION_CONST),
  );
}

Crema.filterName = 'Crema'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Crema;

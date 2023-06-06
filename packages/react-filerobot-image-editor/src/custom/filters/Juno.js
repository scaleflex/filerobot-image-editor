import BaseFilters from './BaseFilters';

const ADJUST_RGB_CONST = [1.01, 1.04, 1];
const SATURATION_CONST = 0.3;

/**
 * Juno Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Juno]);
 */
function Juno(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.adjustRGB(ADJUST_RGB_CONST),
    BaseFilters.saturation(SATURATION_CONST),
  );
}

Juno.filterName = 'Juno'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Juno;

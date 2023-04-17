import BaseFilters from './BaseFilters';

const ADJUST_RGB_CONST = [1.05, 1.1, 1];

/**
 * Perpetua Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Perpetua]);
 */
function Perpetua(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.adjustRGB(ADJUST_RGB_CONST),
  );
}

Perpetua.filterName = 'Perpetua'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Perpetua;

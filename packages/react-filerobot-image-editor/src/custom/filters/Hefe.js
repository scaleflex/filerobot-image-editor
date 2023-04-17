import BaseFilters from './BaseFilters';

const CONTRAST_CONST = 0.1;
const SATURATION_CONST = 0.15;

/**
 * Hefe Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Hefe]);
 */
function Hefe(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.contrast(CONTRAST_CONST),
    BaseFilters.saturation(SATURATION_CONST),
  );
}

Hefe.filterName = 'Hefe'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Hefe;

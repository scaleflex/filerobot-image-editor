import BaseFilters from './BaseFilters';

const CONTRAST_CONST = -0.15;
const SATURATION_CONST = 0.1;

/**
 * Sierra Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Sierra]);
 */
function Sierra(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.contrast(CONTRAST_CONST),
    BaseFilters.saturation(SATURATION_CONST),
  );
}

Sierra.filterName = 'Sierra'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Sierra;

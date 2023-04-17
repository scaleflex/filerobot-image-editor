import BaseFilters from './BaseFilters';

const CONTRAST_CONST = 0.15;
const SATURATION_CONST = 0.2;

/**
 * LoFi Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([LoFi]);
 */
function LoFi(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.contrast(CONTRAST_CONST),
    BaseFilters.saturation(SATURATION_CONST),
  );
}

LoFi.filterName = 'LoFi'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default LoFi;

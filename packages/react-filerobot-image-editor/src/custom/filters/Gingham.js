import BaseFilters from './BaseFilters';

const SEPIA_CONST = 0.04;
const CONTRAST_CONST = -0.15;

/**
 * Gingham Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Gingham]);
 */
function Gingham(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.sepia(SEPIA_CONST),
    BaseFilters.contrast(CONTRAST_CONST),
  );
}

Gingham.filterName = 'Gingham'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Gingham;

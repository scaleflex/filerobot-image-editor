import BaseFilters from './BaseFilters';

const SEPIA_CONST = 0.1;
const COLOR_FILTER_CONST = [255, 145, 0, 0.2];

/**
 * Toaster Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Toaster]);
 */
function Toaster(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.sepia(SEPIA_CONST),
    BaseFilters.colorFilter(COLOR_FILTER_CONST),
  );
}

Toaster.filterName = 'Toaster'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Toaster;

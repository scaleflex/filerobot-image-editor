import BaseFilters from './BaseFilters';

const CONTRAST_CONST = 0.2;
const COLOR_FILTER_CONST = [140, 10, 185, 0.1];

/**
 * Brannan Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Brannan]);
 */
function Brannan(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.contrast(CONTRAST_CONST),
    BaseFilters.colorFilter(COLOR_FILTER_CONST),
  );
}

Brannan.filterName = 'Brannan'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Brannan;

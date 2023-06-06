import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [220, 115, 188, 0.12];
const CONTRAST_CONST = -0.05;

/**
 * Nashville Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Nashville]);
 */
function Nashville(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.colorFilter(COLOR_FILTER_CONST),
    BaseFilters.contrast(CONTRAST_CONST),
  );
}

Nashville.filterName = 'Nashville'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Nashville;

import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [25, 240, 252, 0.05];
const SEPIA_CONST = 0.3;

/**
 * Brooklyn Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Brooklyn]);
 */
function Brooklyn(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.colorFilter(COLOR_FILTER_CONST),
    BaseFilters.sepia(SEPIA_CONST),
  );
}

Brooklyn.filterName = 'Brooklyn'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Brooklyn;

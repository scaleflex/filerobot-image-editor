import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [255, 225, 80, 0.08];
const SATURATION_CONST = 0.1;
const CONTRAST_CONST = 0.05;

/**
 * Valencia Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Valencia]);
 */
function Valencia(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.colorFilter(COLOR_FILTER_CONST),
    BaseFilters.saturation(SATURATION_CONST),
    BaseFilters.contrast(CONTRAST_CONST),
  );
}

Valencia.filterName = 'Valencia'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Valencia;

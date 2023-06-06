import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [230, 115, 108, 0.05];
const SATURATION_CONST = 0.15;

/**
 * Mayfair Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Mayfair]);
 */
function Mayfair(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.colorFilter(COLOR_FILTER_CONST),
    BaseFilters.saturation(SATURATION_CONST),
  );
}

Mayfair.filterName = 'Mayfair'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Mayfair;

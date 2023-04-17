import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [255, 50, 80, 0.12];
const CONTRAST_CONST = 0.05;

/**
 * Charmes Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Charmes]);
 */
function Charmes(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.colorFilter(COLOR_FILTER_CONST),
    BaseFilters.contrast(CONTRAST_CONST),
  );
}

Charmes.filterName = 'Charmes'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Charmes;

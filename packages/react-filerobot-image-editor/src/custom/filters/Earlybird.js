import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [255, 165, 40, 0.2];

/**
 * Earlybird Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Earlybird]);
 */
function Earlybird(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.colorFilter(COLOR_FILTER_CONST),
  );
}

Earlybird.filterName = 'Earlybird'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Earlybird;

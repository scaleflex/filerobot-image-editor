import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [228, 130, 225, 0.13];
const SATURATION_CONST = -0.2;

/**
 * Aden Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Aden]);
 */
function Aden(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.colorFilter(COLOR_FILTER_CONST),
    BaseFilters.saturation(SATURATION_CONST),
  );
}

Aden.filterName = 'Aden'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Aden;

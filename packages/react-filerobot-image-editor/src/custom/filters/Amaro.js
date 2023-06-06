import BaseFilters from './BaseFilters';

const SATURATION_CONST = 0.3;
const BRIGHTNESS_CONST = 0.15;

/**
 * Amaro Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Amaro]);
 */
function Amaro(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.saturation(SATURATION_CONST),
    BaseFilters.brightness(BRIGHTNESS_CONST),
  );
}

Amaro.filterName = 'Amaro'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Amaro;

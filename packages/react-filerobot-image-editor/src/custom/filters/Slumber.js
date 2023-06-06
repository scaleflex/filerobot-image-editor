import BaseFilters from './BaseFilters';

const BRIGHTNESS_CONST = 0.1;
const SATURATION_CONST = -0.5;

/**
 * Slumber Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Slumber]);
 */
function Slumber(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.brightness(BRIGHTNESS_CONST),
    BaseFilters.saturation(SATURATION_CONST),
  );
}

Slumber.filterName = 'Slumber'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Slumber;

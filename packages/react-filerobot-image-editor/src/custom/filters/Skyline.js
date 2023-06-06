import BaseFilters from './BaseFilters';

const SATURATION_CONST = 0.35;
const BRIGHTNESS_CONST = 0.1;

/**
 * Skyline Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Skyline]);
 */
function Skyline(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.saturation(SATURATION_CONST),
    BaseFilters.brightness(BRIGHTNESS_CONST),
  );
}

Skyline.filterName = 'Skyline'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Skyline;

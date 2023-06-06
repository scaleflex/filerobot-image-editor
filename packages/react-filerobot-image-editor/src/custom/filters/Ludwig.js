import BaseFilters from './BaseFilters';

const BRIGHTNESS_CONST = 0.05;
const SATURATION_CONST = -0.03;

/**
 * Ludwig Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Ludwig]);
 */
function Ludwig(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.brightness(BRIGHTNESS_CONST),
    BaseFilters.saturation(SATURATION_CONST),
  );
}

Ludwig.filterName = 'Ludwig'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Ludwig;

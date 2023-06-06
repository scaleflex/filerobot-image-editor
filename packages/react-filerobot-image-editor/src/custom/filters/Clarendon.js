import BaseFilters from './BaseFilters';

const BRIGHTNESS_CONST = 0.1;
const CONTRAST_CONST = 0.1;
const SATURATION_CONST = 0.15;

/**
 * Clarendon Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Clarendon]);
 */
function Clarendon(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.brightness(BRIGHTNESS_CONST),
    BaseFilters.contrast(CONTRAST_CONST),
    BaseFilters.saturation(SATURATION_CONST),
  );
}

Clarendon.filterName = 'Clarendon'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Clarendon;

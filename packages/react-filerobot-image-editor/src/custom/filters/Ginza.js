import BaseFilters from './BaseFilters';

const SEPIA_CONST = 0.06;
const BRIGHTNESS_CONST = 0.1;

/**
 * Ginza Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Ginza]);
 */
function Ginza(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.sepia(SEPIA_CONST),
    BaseFilters.brightness(BRIGHTNESS_CONST),
  );
}

Ginza.filterName = 'Ginza'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Ginza;

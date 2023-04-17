import BaseFilters from './BaseFilters';

const CONTRAST_CONST = 0.15;
const BRIGHTNESS_CONST = 0.1;

/**
 * Dogpatch Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Dogpatch]);
 */
function Dogpatch(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.contrast(CONTRAST_CONST),
    BaseFilters.brightness(BRIGHTNESS_CONST),
  );
}

Dogpatch.filterName = 'Dogpatch'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Dogpatch;

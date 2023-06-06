import BaseFilters from './BaseFilters';

const ADJUST_RGB_CONST = [1, 1, 1.25];
const CONTRAST_CONST = 0.1;
const BRIGHTNESS_CONST = 0.15;

/**
 * Hudson Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Hudson]);
 */
function Hudson(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.adjustRGB(ADJUST_RGB_CONST),
    BaseFilters.contrast(CONTRAST_CONST),
    BaseFilters.brightness(BRIGHTNESS_CONST),
  );
}

Hudson.filterName = 'Hudson'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Hudson;

import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [255, 170, 0, 0.1];
const BRIGHTNESS_CONST = 0.09;
const SATURATION_CONST = 0.1;

/**
 * Rise Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Rise]);
 */
function Rise(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.colorFilter(COLOR_FILTER_CONST),
    BaseFilters.brightness(BRIGHTNESS_CONST),
    BaseFilters.saturation(SATURATION_CONST),
  );
}

Rise.filterName = 'Rise'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Rise;

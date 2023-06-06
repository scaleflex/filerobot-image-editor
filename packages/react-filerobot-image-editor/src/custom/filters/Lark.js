import BaseFilters from './BaseFilters';

const BRIGHTNESS_CONST = 0.08;
const ADJUST_RGB_CONST = [1, 1.03, 1.05];
const SATURATION_CONST = 0.12;

/**
 * Lark Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Lark]);
 */
function Lark(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.brightness(BRIGHTNESS_CONST),
    BaseFilters.adjustRGB(ADJUST_RGB_CONST),
    BaseFilters.saturation(SATURATION_CONST),
  );
}

Lark.filterName = 'Lark'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Lark;

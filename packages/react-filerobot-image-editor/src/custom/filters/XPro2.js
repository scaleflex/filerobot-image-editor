import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [255, 255, 0, 0.07];
const SATURATION_CONST = 0.2;
const CONTRAST_CONST = 0.15;

/**
 * XPro2 Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([XPro2]);
 */
function XPro2(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.colorFilter(COLOR_FILTER_CONST),
    BaseFilters.saturation(SATURATION_CONST),
    BaseFilters.contrast(CONTRAST_CONST),
  );
}

XPro2.filterName = 'XPro2'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default XPro2;

import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [255, 225, 0, 0.05];
const BRIGHTNESS_CONST = 0.06;
const CONTRAST_CONST = 0.06;

/**
 * Vesper Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Vesper]);
 */
function Vesper(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.colorFilter(COLOR_FILTER_CONST),
    BaseFilters.brightness(BRIGHTNESS_CONST),
    BaseFilters.contrast(CONTRAST_CONST),
  );
}

Vesper.filterName = 'Vesper'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default Vesper;

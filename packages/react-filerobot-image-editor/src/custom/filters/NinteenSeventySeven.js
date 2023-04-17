import BaseFilters from './BaseFilters';

const COLOR_FILTER_CONST = [255, 25, 0, 0.15];
const BRIGHTNESS_CONST = 0.1;

/**
 * NinteenSeventySeven Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([NinteenSeventySeven]);
 */
function NinteenSeventySeven(imageData) {
  BaseFilters.apply(
    imageData,
    BaseFilters.colorFilter(COLOR_FILTER_CONST),
    BaseFilters.brightness(BRIGHTNESS_CONST),
  );
}

NinteenSeventySeven.filterName = 'NinteenSeventySeven'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default NinteenSeventySeven;

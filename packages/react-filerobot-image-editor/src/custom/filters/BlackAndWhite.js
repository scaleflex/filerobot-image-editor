import BaseFilters from "./BaseFilters";

/**
 * BlackAndWhite Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([BlackAndWhite]);
 */
function BlackAndWhite(imageData) {
  const thresholdValue = 100;
  BaseFilters.apply(
    imageData,
    (pixels) => {
      const isWhite =
        (pixels[0] + pixels[1] + pixels[2]) / 3 > thresholdValue;
      const val = isWhite ? 255 : 0;
      return [val, val, val];
    },
  );
}

BlackAndWhite.filterName = 'BlackAndWhite'; // We assign the filter name here instead of using the fn. name as on prod. code the fn. name is optimized that might cause bug in that case.

export default BlackAndWhite;

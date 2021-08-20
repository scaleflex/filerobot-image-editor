/**
 * BlackAndWhite Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([BlackAndWhite]);
 */
function BlackAndWhite(imageData) {
  const pixels = imageData.data; //  [0, 1, 2, 3,...] => [r, g, b, a, ...]
  const len = pixels.length;
  const thresholdValue = 100;

  for (let i = 0; i < len; i += 4) {
    const isWhite = ((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3) > thresholdValue;
    pixels[i] = pixels[i + 1] = pixels[i + 2] = isWhite ? 255 : 0;
  }
}

export default BlackAndWhite;

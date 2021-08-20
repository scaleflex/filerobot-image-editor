// USED IN FINETUNE.
import Konva from 'konva';

import addGetterSetter from '../../../utils/addGetterSetter';

/**
 * Warmth Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Warmth]);
 * node.warmth(100);
 *  Red (r) > Blue (b) means warmer effect
  * Red (r) < Blue (b) means cooler effect
 */
function Warmth(imageData) {
  const warmthValue = this.warmth();
  const pixels = imageData.data; //  [0, 1, 2, 3,...] => [r, g, b, a, ...]
  const len = pixels.length;

  for (let i = 0; i < len; i += 4) {
    // red
    pixels[i] += warmthValue;
    // blue
    pixels[i + 2] -= warmthValue;
  }
}

export default Warmth;

/**
 * adds warmth parameter (0 - 200), 0 means no value... 200 max value.
 */
addGetterSetter(
  Konva.Image,
  'warmth',
  0,
);

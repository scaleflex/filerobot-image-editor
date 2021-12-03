/** External Dependencies */
import Konva from 'konva';
import { Factory as KonvaFactory } from 'konva/lib/Factory';
import { getNumberValidator as konvaGetNumberValidator } from 'konva/lib/Validators';

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
KonvaFactory.addGetterSetter(
  Konva.Image,
  'warmth',
  0,
  konvaGetNumberValidator(),
  KonvaFactory.afterSetFilter,
);

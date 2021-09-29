// TODO: remove the eslint-disable on finishing the finetune filter implementation
/* eslint-disable */
/** External Dependencies */
import Konva from 'konva';
import { Factory as KonvaFactory } from 'konva/lib/Factory';
import { getNumberValidator as konvaGetNumberValidator } from 'konva/lib/Validators';

/**
 * Vignette Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([Vignette]);
 * node.vignette(100);
 *  Red (r) > Blue (b) means warmer effect
  * Red (r) < Blue (b) means cooler effect
 */
function Vignette(imageData) {
  const vignetteValue = this.vignette();
  const { data: pixels, width, height } = imageData;
  const len = pixels.length;
  const row = width * 4;
  const column = height * 4;

  for (let i = 0; i < vignetteValue; i++) {
    for (let r = 0; r < row; r += 4) {
      // Top pixels
      pixels[r + (row * vignetteValue)] += 100 - vignetteValue;
      pixels[r + 1 + (row * vignetteValue)] += 100 - vignetteValue;
      pixels[r + 2 + (row * vignetteValue)] += 100 - vignetteValue;
      // Bottom pixels
      pixels[len - r - (row * vignetteValue)] -= 100 - vignetteValue;
      pixels[len - r - 1 - (row * vignetteValue)] -= 100 - vignetteValue;
      pixels[len - r - 2 - (row * vignetteValue)] -= 100 - vignetteValue;
    }
    // for (let c; c < row; c += row) {
    //   pixels[c + (column * vignetteValue)] -= 1;
    // }
  }
  console.log(len);
  console.log(imageData.width);
  console.log(imageData.height);
}

export default Vignette;

/**
 * adds vignette parameter (0 - 200), 0 means no value... 200 max value.
 */
KonvaFactory.addGetterSetter(
  Konva.Image,
  'vignette',
  0,
  konvaGetNumberValidator(),
  KonvaFactory.afterSetFilter,
);

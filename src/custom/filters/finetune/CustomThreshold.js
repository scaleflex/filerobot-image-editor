// USED IN FINETUNE.
import Konva from 'konva';

import addGetterSetter from '../../../utils/addGetterSetter';

/**
 * CustomThreshold Filter.
 * @function
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.filters([CustomThreshold]);
 * node.threshold(100);
 */
function CustomThreshold(imageData) {
  const thresholdValue = this.threshold();
  const isZeroThreshold = thresholdValue === 0;
  const pixels = imageData.data; //  [0, 1, 2, 3,...] => [r, g, b, a, ...]
  const len = pixels.length;

  for (let i = 0; i < len; i += 4) {
    pixels[i] = isZeroThreshold
      ? pixels[i]
      : pixels[i] >= thresholdValue
        ? 255
        : 0;
    pixels[i + 1] = isZeroThreshold
      ? pixels[i + 1]
      : pixels[i + 1] >= thresholdValue
        ? 255
        : 0;
    pixels[i + 2] = isZeroThreshold
      ? pixels[i + 2]
      : pixels[i + 2] >= thresholdValue
        ? 255
        : 0;
  }
}

export default CustomThreshold;

/**
 * adds threshold parameter (0 - 255), 0 means no value... 255 max value.
 */
addGetterSetter(
  Konva.Image,
  'threshold',
  0,
);

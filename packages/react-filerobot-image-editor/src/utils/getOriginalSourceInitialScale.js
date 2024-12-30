/** Internal dependencies */
import getDimensionsMinimalRatio from './getDimensionsMinimalRatio';

const getOriginalSourceInitialScale = ({
  initialCanvasWidth,
  initialCanvasHeight,
  originalSource,
} = {}) =>
  initialCanvasWidth >= originalSource.width &&
  initialCanvasHeight >= originalSource.height
    ? 1
    : getDimensionsMinimalRatio(
        initialCanvasWidth,
        initialCanvasHeight,
        originalSource.width,
        originalSource.height,
      );

export default getOriginalSourceInitialScale;

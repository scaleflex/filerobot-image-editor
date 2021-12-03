import mapNumber from './mapNumber';

const mapCropBox = (crop, shownImageDimensions, preparedCanvas) => ({
  x: Math.round(
    mapNumber(
      crop.x,
      0,
      shownImageDimensions.width, // could replace with image node's dimensions from designLayer as they're same
      0,
      preparedCanvas.width(),
    ),
  ),
  y: Math.round(
    mapNumber(
      crop.y,
      0,
      shownImageDimensions.height,
      0,
      preparedCanvas.height(),
    ),
  ),
  width: Math.round(
    mapNumber(
      crop.width,
      0,
      shownImageDimensions.width,
      0,
      preparedCanvas.width(),
    ),
  ),
  height: Math.round(
    mapNumber(
      crop.height,
      0,
      shownImageDimensions.height,
      0,
      preparedCanvas.height(),
    ),
  ),
});

export default mapCropBox;

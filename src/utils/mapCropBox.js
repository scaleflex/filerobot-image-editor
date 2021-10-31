import mapNumber from './mapNumber';

const mapCropBox = (crop, shownImageDimensions, preparedCanvas) => ({
  x: mapNumber(
    crop.x,
    0,
    shownImageDimensions.width, // could replace with image node's dimensions from designLayer as they're same
    0,
    preparedCanvas.width(),
  ),
  y: mapNumber(
    crop.y,
    0,
    shownImageDimensions.height,
    0,
    preparedCanvas.height(),
  ),
  width: mapNumber(
    crop.width,
    0,
    shownImageDimensions.width,
    0,
    preparedCanvas.width(),
  ),
  height: mapNumber(
    crop.height,
    0,
    shownImageDimensions.height,
    0,
    preparedCanvas.height(),
  ),
});

export default mapCropBox;

import mapNumber from './mapNumber';

const mapCropBox = (crop, shownImageDimensions, toDimensions) => ({
  x: Math.round(
    mapNumber(
      crop.x,
      0,
      shownImageDimensions.width, // could replace with image node's dimensions from designLayer as they're same
      0,
      toDimensions.width,
    ),
  ),
  y: Math.round(
    mapNumber(crop.y, 0, shownImageDimensions.height, 0, toDimensions.height),
  ),
  width: Math.round(
    mapNumber(crop.width, 0, shownImageDimensions.width, 0, toDimensions.width),
  ),
  height: Math.round(
    mapNumber(
      crop.height,
      0,
      shownImageDimensions.height,
      0,
      toDimensions.height,
    ),
  ),
});

export default mapCropBox;

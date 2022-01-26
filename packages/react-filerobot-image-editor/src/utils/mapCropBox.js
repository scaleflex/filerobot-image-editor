import mapNumber from './mapNumber';

const mapCropBox = (crop, shownImageDimensions, toDimensions) => ({
  ...(crop.x || crop.x === 0
    ? {
        x: Math.round(
          mapNumber(
            crop.x,
            0,
            shownImageDimensions.width, // could replace with image node's dimensions from designLayer as they're same
            0,
            toDimensions.width,
          ),
        ),
      }
    : {}),
  ...(crop.y || crop.y === 0
    ? {
        y: Math.round(
          mapNumber(
            crop.y,
            0,
            shownImageDimensions.height,
            0,
            toDimensions.height,
          ),
        ),
      }
    : {}),
  width: Math.round(
    mapNumber(
      crop.width ?? shownImageDimensions.width,
      0,
      shownImageDimensions.width,
      0,
      toDimensions.width,
    ),
  ),
  height: Math.round(
    mapNumber(
      crop.height ?? shownImageDimensions.height,
      0,
      shownImageDimensions.height,
      0,
      toDimensions.height,
    ),
  ),
});

export default mapCropBox;

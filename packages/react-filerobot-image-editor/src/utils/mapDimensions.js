/** Internal Dependencies */
import mapNumber from './mapNumber';

const isNumber = (value) => typeof value === 'number';

const mapDimensions = ({ dimensions, oldMapDimensions, newMapDimensions }) => {
  if (!dimensions) {
    return {};
  }

  const mappedDimensions = {
    ...(isNumber(dimensions.width) && {
      width: mapNumber(
        dimensions.width,
        0,
        oldMapDimensions.width,
        0,
        newMapDimensions.width,
      ),
    }),
    ...(isNumber(dimensions.height) && {
      height: mapNumber(
        dimensions.height,
        0,
        oldMapDimensions.height,
        0,
        newMapDimensions.height,
      ),
    }),
    ...(isNumber(dimensions.x) && {
      x: mapNumber(
        dimensions.x,
        0,
        oldMapDimensions.width,
        0,
        newMapDimensions.width,
      ),
    }),
    ...(isNumber(dimensions.y) && {
      y: mapNumber(
        dimensions.y,
        0,
        oldMapDimensions.height,
        0,
        newMapDimensions.height,
      ),
    }),
    ...(isNumber(dimensions.radiusX) && {
      radiusX: mapNumber(
        dimensions.radiusX,
        0,
        oldMapDimensions.width,
        0,
        newMapDimensions.width,
      ),
    }),
    ...(isNumber(dimensions.radiusY) && {
      radiusY: mapNumber(
        dimensions.radiusY,
        0,
        oldMapDimensions.height,
        0,
        newMapDimensions.height,
      ),
    }),
  };

  return mappedDimensions;
};

export default mapDimensions;

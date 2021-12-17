import compareRatios from 'utils/compareRatios';
import restrictNumber from 'utils/restrictNumber';
import toPrecisedFloat from 'utils/toPrecisedFloat';

export const boundDragging = (newDimensions, allowedArea) => {
  const maxAllowedX =
    allowedArea.width - (newDimensions.radiusX * 2 || newDimensions.width);
  const maxAllowedY =
    allowedArea.height - (newDimensions.radiusY * 2 || newDimensions.height);
  return {
    x: toPrecisedFloat(Math.min(Math.max(newDimensions.x, 0), maxAllowedX)),
    y: toPrecisedFloat(Math.min(Math.max(newDimensions.y, 0), maxAllowedY)),
  };
};

export const boundResizing = (
  oldDimensions,
  newDimensions,
  allowedArea,
  ratio,
  cropRestrictions = {},
) => {
  const scaledAllowedArea = {
    x: toPrecisedFloat(allowedArea.abstractX * allowedArea.scaledBy),
    y: toPrecisedFloat(allowedArea.abstractY * allowedArea.scaledBy),
    width: toPrecisedFloat(allowedArea.width * allowedArea.scaledBy),
    height: toPrecisedFloat(allowedArea.height * allowedArea.scaledBy),
  };
  const boundedDimensions = { ...newDimensions };
  if (newDimensions.x < scaledAllowedArea.x) {
    boundedDimensions.x = scaledAllowedArea.x;
    boundedDimensions.width =
      oldDimensions.x - scaledAllowedArea.x + oldDimensions.width;
  }
  if (newDimensions.y < scaledAllowedArea.y) {
    boundedDimensions.y = scaledAllowedArea.y;
    boundedDimensions.height =
      oldDimensions.y - scaledAllowedArea.y + oldDimensions.height;
  }
  if (
    boundedDimensions.x + boundedDimensions.width >
    scaledAllowedArea.x + scaledAllowedArea.width
  ) {
    boundedDimensions.width =
      scaledAllowedArea.x + scaledAllowedArea.width - boundedDimensions.x;
  }
  if (
    boundedDimensions.y + boundedDimensions.height >
    scaledAllowedArea.y + scaledAllowedArea.height
  ) {
    boundedDimensions.height =
      scaledAllowedArea.y + scaledAllowedArea.height - boundedDimensions.y;
  }

  if (
    ratio &&
    !compareRatios(boundedDimensions.width / boundedDimensions.height, ratio)
  ) {
    const ratioedBoundedWidth = boundedDimensions.height * ratio;
    const ratioedBoundedHeight = boundedDimensions.width / ratio;

    if (
      toPrecisedFloat(boundedDimensions.y + ratioedBoundedHeight) <=
      scaledAllowedArea.y + scaledAllowedArea.height
    ) {
      boundedDimensions.height = ratioedBoundedHeight;
    } else {
      boundedDimensions.width = ratioedBoundedWidth;
    }
  }

  if (
    (cropRestrictions.minWidth &&
      boundedDimensions.width <= cropRestrictions.minWidth) ||
    (cropRestrictions.maxWidth &&
      boundedDimensions.width >= cropRestrictions.maxWidth)
  ) {
    boundedDimensions.width = restrictNumber(
      boundedDimensions.width,
      cropRestrictions.minWidth,
      cropRestrictions.maxWidth,
    );
    boundedDimensions.x = oldDimensions.x;
    boundedDimensions.y = oldDimensions.y;

    if (ratio) {
      boundedDimensions.height = boundedDimensions.width / ratio;
    }
  }
  if (
    (cropRestrictions.minHeight &&
      newDimensions.height <= cropRestrictions.minHeight) ||
    (cropRestrictions.maxHeight &&
      newDimensions.height >= cropRestrictions.maxHeight)
  ) {
    boundedDimensions.height = restrictNumber(
      boundedDimensions.height,
      cropRestrictions.minHeight,
      cropRestrictions.maxHeight,
    );

    boundedDimensions.x = oldDimensions.x;
    boundedDimensions.y = oldDimensions.y;

    if (ratio) {
      boundedDimensions.width = boundedDimensions.height * ratio;
    }
  }

  return boundedDimensions;
};

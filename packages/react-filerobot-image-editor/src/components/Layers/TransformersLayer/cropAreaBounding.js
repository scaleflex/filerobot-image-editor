import compareRatios from 'utils/compareRatios';
import restrictNumber from 'utils/restrictNumber';
import toPrecisedFloat from 'utils/toPrecisedFloat';

export const boundDragging = (newDimensions, allowedArea) => {
  const scaledAllowedArea = {
    x: allowedArea.abstractX * allowedArea.scaledBy,
    y: allowedArea.abstractY * allowedArea.scaledBy,
    width: allowedArea.width * allowedArea.scaledBy,
    height: allowedArea.height * allowedArea.scaledBy,
  };
  // As in dragging we are receiving width and height without parent's scaling so we should apply scaling here
  // the scaledBy of allowedArea is the same as the scaledBy for the width and height as it refers to the canvas's scale
  // Which scales both the crop transformer and allowed area.
  const scaledNewDimensions = {
    width: newDimensions.width * allowedArea.scaledBy,
    height: newDimensions.height * allowedArea.scaledBy,
  };

  const maxAllowedX = scaledAllowedArea.x + scaledAllowedArea.width;
  const maxAllowedY = scaledAllowedArea.y + scaledAllowedArea.height;
  const boundedDimensions = {
    x: Math.max(scaledAllowedArea.x, newDimensions.x),
    y: Math.max(scaledAllowedArea.y, newDimensions.y),
  };

  if (boundedDimensions.x + scaledNewDimensions.width > maxAllowedX) {
    boundedDimensions.x = maxAllowedX - scaledNewDimensions.width;
  }

  if (boundedDimensions.y + scaledNewDimensions.height > maxAllowedY) {
    boundedDimensions.y = maxAllowedY - scaledNewDimensions.height;
  }

  return boundedDimensions;
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

  const maxAllowedX = scaledAllowedArea.x + scaledAllowedArea.width;
  const maxAllowedY = scaledAllowedArea.y + scaledAllowedArea.height;

  const boundedDimensions = { ...newDimensions };
  if (toPrecisedFloat(boundedDimensions.x) < scaledAllowedArea.x) {
    boundedDimensions.x = scaledAllowedArea.x;
    boundedDimensions.width =
      oldDimensions.x - scaledAllowedArea.x + oldDimensions.width;
  }

  if (toPrecisedFloat(boundedDimensions.y) < scaledAllowedArea.y) {
    boundedDimensions.y = scaledAllowedArea.y;
    boundedDimensions.height =
      oldDimensions.y - scaledAllowedArea.y + oldDimensions.height;
  }

  if (
    toPrecisedFloat(boundedDimensions.x) +
      toPrecisedFloat(boundedDimensions.width) >
    maxAllowedX
  ) {
    boundedDimensions.width = maxAllowedX - boundedDimensions.x;
  }

  if (
    toPrecisedFloat(boundedDimensions.y) +
      toPrecisedFloat(boundedDimensions.height) >
    maxAllowedY
  ) {
    boundedDimensions.height = maxAllowedY - boundedDimensions.y;
  }

  if (
    ratio &&
    !compareRatios(boundedDimensions.width / boundedDimensions.height, ratio)
  ) {
    const ratioedBoundedWidth = boundedDimensions.height * ratio;
    const ratioedBoundedHeight = boundedDimensions.width / ratio;

    if (
      toPrecisedFloat(boundedDimensions.y + ratioedBoundedHeight) <= maxAllowedY
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

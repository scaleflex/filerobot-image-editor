// const boundCropArea = (currentArea = {}, allowedArea = {}, keepRatio) => {
//   const { old: previousArea = {}, new: latestArea } = currentArea;
//   const newArea = latestArea || currentArea;

//   const boundedArea = {};
//   if (newArea.x && allowedArea.x) {
//     boundedArea.x = Math.max(newArea.x, allowedArea.x);
//     if (previousArea.width && newArea.x < allowedArea.x) {
//       boundedArea.width = previousArea.width;
//       if (keepRatio) {
//         boundedArea.height = previousArea.height;
//       }
//     }
//   }

//   if (newArea.y && allowedArea.y) {
//     boundedArea.y = Math.max(newArea.y, allowedArea.y);
//     if (previousArea.height && newArea.y < allowedArea.y) {
//       boundedArea.height = previousArea.height;
//       if (keepRatio) {
//         boundedArea.width = previousArea.width;
//       }
//     }
//   }

//   if (newArea.x + newArea.width > allowedArea.x + allowedArea.width) {
//     boundedArea.x =
//       previousArea.x || allowedArea.x + allowedArea.width - newArea.width;
//     boundedArea.width = allowedArea.x + allowedArea.width - boundedArea.x;
//   }

//   if (newArea.y + newArea.height > allowedArea.y + allowedArea.height) {
//     boundedArea.y =
//       previousArea.y || allowedArea.y + allowedArea.height - newArea.height;
//     boundedArea.height = allowedArea.y + allowedArea.height - boundedArea.y;
//   }

//   const boundedAreaKeysCount = Object.keys(boundedArea).length;
//   const finalBoundedArea =
//     boundedAreaKeysCount !== Object.keys(newArea).length
//       ? {
//           ...newArea,
//           ...boundedArea,
//         }
//       : boundedArea;
//   // console.log(finalBoundedArea);
//   return boundedAreaKeysCount > 0 ? finalBoundedArea : null;
// };

// export default boundCropArea;

// const boundCropArea = () => {
//   x = Math.max(MIN_ALLOWED_X, CURRENT_X)
//   y = Math.max(MIN_ALLOWED_Y, CURRENT_Y)
//   (MIN_ALLOWED_X + WIDTH) - (CURRENT_X)
//   width = Math.min(MIN_ALLOWED_X + WIDTH, CURRENT_X + CURRENT_)
// };

export const boundDragging = (newDimensions, allowedArea) => {
  const maxAllowedX = allowedArea.x + allowedArea.width;
  const maxAllowedY = allowedArea.y + allowedArea.height;
  const boundedDimensions = {
    x: Math.max(allowedArea.x, newDimensions.x),
    y: Math.max(allowedArea.y, newDimensions.y),
  };

  if (newDimensions.x + newDimensions.width > maxAllowedX) {
    boundedDimensions.x = maxAllowedX - newDimensions.width;
  }

  if (newDimensions.y + newDimensions.height > maxAllowedY) {
    boundedDimensions.y = maxAllowedY - newDimensions.height;
  }

  return boundedDimensions;
};

export const boundResizing = (
  oldDimensions,
  newDimensions,
  allowedArea,
  ratio,
) => {
  const maxAllowedX = allowedArea.x + allowedArea.width;
  const maxAllowedY = allowedArea.y + allowedArea.height;

  const boundedDimensions = { ...newDimensions };

  if (newDimensions.x < allowedArea.x) {
    boundedDimensions.x = allowedArea.x;
    boundedDimensions.width =
      oldDimensions.x - boundedDimensions.x + oldDimensions.width;
    if (ratio) {
      boundedDimensions.height = boundedDimensions.width / ratio;
      boundedDimensions.y = oldDimensions.y;
    }
  }

  if (newDimensions.y < allowedArea.y) {
    boundedDimensions.y = allowedArea.y;
    boundedDimensions.height =
      oldDimensions.y - boundedDimensions.y + oldDimensions.height;
    if (ratio) {
      boundedDimensions.width = boundedDimensions.height * ratio;
      boundedDimensions.x = oldDimensions.x;
    }
  }

  if (
    newDimensions.x + newDimensions.width > maxAllowedX &&
    boundedDimensions.y + boundedDimensions.height !== maxAllowedY
  ) {
    boundedDimensions.width = maxAllowedX - newDimensions.x;
    if (ratio) {
      boundedDimensions.height = boundedDimensions.width / ratio;
      boundedDimensions.y = oldDimensions.y;
    }
  }

  if (
    newDimensions.y + newDimensions.height > maxAllowedY &&
    boundedDimensions.x + boundedDimensions.width !== maxAllowedX
  ) {
    boundedDimensions.height = maxAllowedY - newDimensions.y;
    if (ratio) {
      boundedDimensions.width = boundedDimensions.height * ratio;
      boundedDimensions.x = oldDimensions.x;
    }
  }

  return boundedDimensions;
};

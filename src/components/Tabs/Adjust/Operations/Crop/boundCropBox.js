/**
 * Limits the crop position for not exceeding the range (min, max) specified whether the whole canvas or custom range.
 * 
 * @returns {Object} newDimensions - The object contains the new dimensions that are contained within the range dimensions.
*/
const boundCropBox = (dimensions,  rangeDimensions) => {
  const { min, max } = rangeDimensions;
  const { current = {}, old = {}, isResizing, isCustomCrop } = dimensions;
  const newDimensions = { ...current };
  const resizingAndNotCustom = isResizing && !isCustomCrop;

  if (current.x < 0) {
    newDimensions.x = 0;
    newDimensions.width = old.width + old.x;
    if (resizingAndNotCustom) {
      newDimensions.height = old.height;
      newDimensions.y = old.y;
    }
  };

  if (current.y < 0) {
    newDimensions.y = 0;
    newDimensions.height = old.height + old.y;
    if (resizingAndNotCustom) {
      newDimensions.width = old.width;
      newDimensions.x = old.x;
    }
  };

  if (newDimensions.width < min.width) { newDimensions.width = min.width; }

  if (max.width && newDimensions.width > max.width) { newDimensions.width = max.width; }

  if (newDimensions.x + newDimensions.width > max.x) {
    if (isResizing) {
      newDimensions.width = max.x - newDimensions.x;

      if (!isCustomCrop) {
        newDimensions.y = old.y;  
        newDimensions.height = old.height;  
      }
    } else {
      newDimensions.x = max.x - current.width;
    }
  };

  if (newDimensions.height < min.height) { newDimensions.height = min.height; }

  if (max.height && newDimensions.height > max.height) { newDimensions.height = max.height; }
  
  if (newDimensions.y + newDimensions.height > max.y) {
    if (isResizing) {
      newDimensions.height = max.y - newDimensions.y;

      if (!isCustomCrop) {
        newDimensions.x = old.x;  
        newDimensions.width = old.width;  
      }
    } else {
      newDimensions.y = max.y - current.height;
    }
  };

  return newDimensions;
}

export default boundCropBox;

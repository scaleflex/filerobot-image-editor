export const getWatermarkSquaredPosition = (position = 'center', canvas, width, height) => {
  const canvasRect = canvas.getBoundingClientRect();

  const scaleRatio = 30 / 100; // 30%

  const scaledHeight = canvasRect.height * scaleRatio;
  const scaledWidth = canvasRect.width * scaleRatio;

  if (scaledWidth < width || scaledHeight < height) {
    const aspectRatio = width / height;
    if (height > width) {
      height = scaledHeight;
      width = height * aspectRatio;
    } else {
      width = scaledWidth;
      height = width / aspectRatio;
    }
  }

  const centerPositionX = (canvasRect.width / 2) - (width / 2);
  const centerPositionY = (canvasRect.height / 2) - (height / 2);

  if (position === 'center') {
    return [centerPositionX, centerPositionY, width, height];
  }

  position = position.split('-');

  const paddingSpace = 1.5 / 100; // 1.5%
  
  const widthSpace = canvasRect.width * paddingSpace;
  const heightSpace = canvasRect.height * paddingSpace;

  const rightPosition = (canvasRect.width - width) - widthSpace;
  const bottomPosition = (canvasRect.height - height) - heightSpace;
  
  return [
    ...position.map(
        (p, i) => {
        if (p === 'center') { return i === 0 ? centerPositionX : centerPositionY }
        if (p === 'right') { return rightPosition; }
        if (p === 'bottom') { return bottomPosition; }
        if (p === 'left') { return widthSpace; }
        if (p === 'top') { return heightSpace; }
      }
    ),
    width,
    height
  ]
}
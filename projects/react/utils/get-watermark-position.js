export const getWatermarkPosition = (position = 'center', canvas, width, height) => {
  const canvasRect = canvas.getBoundingClientRect();
  const centerPositionX = (canvasRect.width / 2) - (width / 2);
  const centerPositionY = (canvasRect.height / 2) - (height / 2);

  if (position === 'center') {
    return [centerPositionX, centerPositionY];
  }

  position = position.split('-');

  const rightPosition = canvasRect.width - width - 5;
  const bottomPosition = canvasRect.height - height - 5;
  
  return position.map((p, i) => {
    if (p === 'center') { return i === 0 ? centerPositionX : centerPositionY }
    if (p === 'right') { return rightPosition; }
    if (p === 'bottom') { return bottomPosition; }

    // If top or left or unknown value would return 0 as 0 the right position for left & top.
    return 5;
  })
}
function getDistance(p1, p2) {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

function getCenter(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}
let lastCenter = null;
let lastDist = 0;

export const zoomOnTouchesMove = (e, saveZoomFn) => {
  e.evt.preventDefault();
  const touch1 = e.evt.touches[0];
  const touch2 = e.evt.touches[1];

  if (!touch1 || !touch2) {
    return;
  }
  const stageCanvas = e.currentTarget;
  // if the stageCanvas was under Konva's drag&drop
  // we need to stop it, and implement our own pan logic with two pointers
  if (stageCanvas.isDragging()) {
    stageCanvas.stopDrag();
  }

  const p1 = {
    x: touch1.clientX,
    y: touch1.clientY,
  };
  const p2 = {
    x: touch2.clientX,
    y: touch2.clientY,
  };

  if (!lastCenter) {
    lastCenter = getCenter(p1, p2);
    return;
  }
  const newCenter = getCenter(p1, p2);

  const dist = getDistance(p1, p2);

  if (!lastDist) {
    lastDist = dist;
  }

  // local coordinates of center point
  const pointTo = {
    x: (newCenter.x - stageCanvas.x()) / stageCanvas.scaleX(),
    y: (newCenter.y - stageCanvas.y()) / stageCanvas.scaleX(),
  };

  const scale = stageCanvas.scaleX() * (dist / lastDist);

  // calculate new position of the stageCanvas
  const dx = newCenter.x - lastCenter.x;
  const dy = newCenter.y - lastCenter.y;

  const newPos = {
    x: newCenter.x - pointTo.x * scale + dx,
    y: newCenter.y - pointTo.y * scale + dy,
  };

  lastDist = dist;
  lastCenter = newCenter;

  saveZoomFn({
    ...newPos,
    factor: scale,
    preparedDimensions: true,
  });
};

export const endTouchesZooming = (cb) => {
  lastDist = 0;
  lastCenter = null;
  if (typeof cb === 'function') {
    cb();
  }
};

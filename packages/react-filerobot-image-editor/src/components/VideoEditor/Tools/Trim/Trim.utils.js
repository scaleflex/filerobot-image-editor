export const pixelToTime = (pixelPosition, totalWidth, duration) => {
  const time = (pixelPosition / totalWidth) * duration;
  return Number(time.toFixed(2));
};

export const timeToPixel = (time, totalWidth, duration) => {
  const pixels = (time / duration) * totalWidth;
  return Number(pixels.toFixed(2));
};

export const getCurrentSegmentIndex = (segments, currentTime) => {
  if (segments.length === 0) return 0;

  return segments.findIndex(
    (segment) => currentTime >= segment.start && currentTime <= segment.end,
  );
};

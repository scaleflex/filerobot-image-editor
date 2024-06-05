const isSameSource = (source1, source2) =>
  source1 &&
  source2 &&
  (((source1 instanceof HTMLImageElement || typeof source1 === 'object') &&
    source1.src === source2.src &&
    source1.width === source2.width &&
    source1.height === source2.height &&
    source1.bgColor === source2.bgColor &&
    source1.opacity === source2.opacity) ||
    (source1?.src || source1) === source2.src);

export default isSameSource;

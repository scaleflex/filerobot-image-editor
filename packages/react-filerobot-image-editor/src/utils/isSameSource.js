const isSameSource = (source1, source2) =>
  source1 &&
  source2 &&
  ((source1 instanceof HTMLImageElement && source1 === source2) ||
    (typeof source1 === 'object' &&
      Object.keys(source1).every((key) => source1[key] === source2[key])));

export default isSameSource;

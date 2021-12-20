const deepMerge = (source, object = {}, considerArray = false) => {
  const mergedObject = { ...source };
  const keys = Object.keys(object);
  keys.forEach((k) => {
    // considers null in the values.
    const val = object[k];
    if (val !== undefined) {
      const valType = typeof val;
      if (
        valType !== 'object' ||
        val === null ||
        Array.isArray(val) ||
        !source[k] ||
        typeof source[k] !== 'object'
      ) {
        mergedObject[k] =
          considerArray && Array.isArray(mergedObject[k]) && Array.isArray(val)
            ? [...mergedObject[k], ...val]
            : val;
        return;
      }

      // After the above condition we now have both of them in type objects.
      mergedObject[k] = deepMerge(source[k], val);
    }
  });

  return mergedObject;
};

export default deepMerge;

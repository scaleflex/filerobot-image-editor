const isDefaultZeroValuesOnly = (initialProps, newProps) => (
  initialProps &&
  Object.keys(initialProps || {}).every((key) => initialProps[key] === 0) &&
  newProps &&
  Object.keys(newProps || {}).length === 0
)

export default isDefaultZeroValuesOnly;

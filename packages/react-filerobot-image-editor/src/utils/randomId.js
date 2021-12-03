const randomId = (prefixString = '') =>
  `${prefixString}${prefixString ? '-' : ''}${parseInt(
    Date.now() * Math.random(),
    10,
  )}`;

export default randomId;

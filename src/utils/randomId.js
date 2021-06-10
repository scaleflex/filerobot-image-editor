const randomId = (prefixString = '') => (
  `${prefixString}${prefixString ? '-' : ''}${parseInt(Date.now() * Math.random())}`
);

export default randomId;

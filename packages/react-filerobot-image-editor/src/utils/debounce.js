const debounce = (func, timeout = 300) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    const [firstArg, ...otherArgs] = args;
    timer = setTimeout(
      func.bind(null, firstArg?.target?.value ?? firstArg, ...otherArgs),
      timeout,
    );
  };
};

export default debounce;

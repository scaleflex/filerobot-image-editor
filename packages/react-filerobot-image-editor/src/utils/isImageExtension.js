const isImageExtension = (url) => {
  return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url);
};

export default isImageExtension;

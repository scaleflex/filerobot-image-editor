const isVideoExtension = (url) => {
  return /\.(mp4|webm|ogg|avi|mov|wmv)$/i.test(url);
};

export default isVideoExtension;

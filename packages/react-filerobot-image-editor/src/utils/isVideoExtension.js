const isVideoExtension = (url) => {
  return /\.(mp4|webm|ogg|avi|mov|wmv|quicktime|x-msvideo)$/i.test(url);
};

export default isVideoExtension;

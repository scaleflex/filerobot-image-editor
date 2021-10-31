const extractNameFromUrl = (url) => {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 1];
};

export default extractNameFromUrl;

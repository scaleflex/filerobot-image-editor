const extractNameFromUrl = (url) => {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 1].split('?')[0];
};

export default extractNameFromUrl;

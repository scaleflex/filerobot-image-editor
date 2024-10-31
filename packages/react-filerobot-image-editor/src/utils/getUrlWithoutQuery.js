const getUrlWithoutQuery = (url) => {
  const parsedUrl = new URL(url);
  return `${parsedUrl.origin}${parsedUrl.pathname}`;
};

export default getUrlWithoutQuery;

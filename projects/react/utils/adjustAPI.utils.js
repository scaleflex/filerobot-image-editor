/* API change from file.url_permalink to file.url.permalink
* */

export const getPermalink = file => {
  if (file.url && file.url.permalink)
    return file.url.permalink;
  else if (file.url_permalink)
    return file.url_permalink;
  else
    return '';
}

export const getPubliclink = file => {
  if (file.url && file.url.public)
    return file.url.public;
  else if (file.url_public)
    return file.url_public;
  else
    return '';
}
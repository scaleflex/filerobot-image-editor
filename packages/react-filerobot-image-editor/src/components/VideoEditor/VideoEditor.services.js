import isBlobFile from 'utils/isBlobFile';

const getDefaultHeaders = ({ key, token, headers }) => {
  return {
    ...headers,
    ...(key && { 'X-Filerobot-Key': key }),
    ...(token && { 'Filerobot-Token': token }),
  };
};

const getQueryParams = (params) => {
  const filteredParams = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  return new URLSearchParams(filteredParams).toString();
};

const getData = (data) => {
  if (isBlobFile(data?.source)) {
    const formData = new FormData();
    formData.append('file', data.source, data.name);

    if (data.time_data) {
      formData.append('time_data', data.time_data);
    }
    return formData;
  }

  return JSON.stringify([data]);
};

const transformResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  if (response.ok) {
    if (contentType === 'application/json') {
      return response.json().then((jsonResponse) => jsonResponse);
    }

    if (contentType?.includes('video/mp4')) {
      return response.blob();
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    const error =
      errorData?.message || errorData?.result?.msg || errorData?.result?.hint;
    return Promise.reject(error);
  }
};

const baseUrl = import.meta.env.DEV
  ? 'http://ask-dev.filerobot.com:8732'
  : 'https://api.filerobot.com/videos/v2';

export const trimVideo = ({
  key,
  token,
  data,
  path = 'url',
  crop,
  resize,
  rotation,
  flip,
  onError,
  signal,
}) =>
  fetch(
    `${baseUrl}/trim/${path}?${getQueryParams({
      include_cdn: false,
      crop,
      resize,
      rotate: rotation,
      flip,
    })}`,
    {
      body: getData(data),
      headers: getDefaultHeaders({
        key,
        token,
        ...(!isBlobFile(data?.source) && {
          'Content-Type': 'application/json',
        }),
      }),
      method: 'POST',
      signal,
    },
  )
    .then(transformResponse)
    .catch(onError);

export const transformVideo = ({
  key,
  token,
  data,
  path = 'url',
  crop,
  resize,
  rotation,
  flip,
  signal,
}) =>
  fetch(
    `${baseUrl}/transformations/${path}?${getQueryParams({
      include_cdn: false,
      crop,
      resize,
      rotate: rotation,
      flip,
    })}`,
    {
      body: getData(data),
      headers: getDefaultHeaders({
        key,
        token,
        ...(!isBlobFile(data?.source) && {
          'Content-Type': 'application/json',
        }),
      }),
      method: 'POST',
      signal,
    },
  ).then(transformResponse);

export const get = (url, signal) =>
  fetch(url, { method: 'GET', signal }).then(transformResponse);

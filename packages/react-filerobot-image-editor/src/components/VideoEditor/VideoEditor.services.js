const getHeaders = ({ key, token }) => {
  return {
    'Content-Type': 'application/json',
    'Filerobot-Key': key,
    'Filerobot-Token': token,
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

const transformResponse = (response) => {
  if (response.ok) {
    return response.json().then((jsonResponse) => jsonResponse);
  }
};

const baseUrl = !import.meta.env.DEV
  ? 'http://ask-dev.filerobot.com:8732'
  : 'https://api.filerobot.com/videos/v2';

export const trimVideo = ({
  key,
  token,
  url,
  crop,
  rotation,
  trimTimeData,
  flip,
  onError,
}) =>
  fetch(
    `${baseUrl}/trim/url?${getQueryParams({ crop, rotate: rotation, flip })}`,
    {
      body: JSON.stringify([
        {
          url,
          time_data: trimTimeData,
        },
      ]),
      headers: getHeaders({ key, token }),
      method: 'POST',
    },
  )
    .then(transformResponse)
    .catch(onError);

export const transformVideo = ({
  key,
  token,
  url,
  crop,
  rotation,
  flip,
  onError,
}) =>
  fetch(
    `${baseUrl}/transformations/url?${getQueryParams({
      crop,
      rotate: rotation,
      flip,
    })}`,
    {
      body: JSON.stringify([{ url }]),
      headers: getHeaders({ key, token }),
      method: 'POST',
    },
  )
    .then(transformResponse)
    .catch(onError);

export const get = (url, onError) =>
  fetch(url, { method: 'GET' }).then(transformResponse).catch(onError);

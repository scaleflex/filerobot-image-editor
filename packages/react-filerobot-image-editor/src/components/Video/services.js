import formatSecondsToDuration from 'utils/formatSecondsToDuration';

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
  if (!response.ok) {
    return response.json().then((jsonResponse) => {
      const error = { message: response.statusText, ...jsonResponse };
      console.warn(error.message);
    });
  }

  return response.json().then((jsonResponse) => jsonResponse);
};

const baseUrl = import.meta.env.DEV
  ? 'http://ask-dev.filerobot.com:8732/trim/url'
  : 'https://api.filerobot.com/videos/v2/trim/url';

export const trimVideo = ({ key, token, url, crop, rotation, duration }) =>
  fetch(`${baseUrl}?${getQueryParams({ crop, rotation })}`, {
    body: JSON.stringify([
      {
        url,
        time_data: `('00:00:00','00:00:01'),('00:00:01','${formatSecondsToDuration(
          duration,
          true,
        )}')`,
      },
    ]),
    headers: getHeaders({ key, token }),
    method: 'POST',
  }).then(transformResponse);

export const get = (url) =>
  fetch(url, { method: 'GET' }).then(transformResponse);

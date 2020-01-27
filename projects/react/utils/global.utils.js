export const getCanvasNode = (id = 'scaleflex-image-edit-box') => window.document.getElementById(id);

export const getBaseAPI = (baseAPI, container, platform) =>
  baseAPI ? baseAPI + '/' : getBaseUrl(container, platform);

export const getBaseUrl = (container, platform = 'filerobot') =>  platform === 'filerobot' ?
  `https://api.filerobot.com/${container}/v3/` :
  `https://${container}.api.airstore.io/v1/`;

export const getSecretHeaderName = (platform = 'filerobot') => platform === 'filerobot' ?
  `X-Filerobot-Key` : `X-Airstore-Secret-Key`;
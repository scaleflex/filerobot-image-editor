export const getBaseUrl = (container, platform = 'filerobot') =>  platform === 'filerobot' ?
  `https://api.filerobot.com/${container}/v3/` :
  `https://${container}.api.airstore.io/v1/`;
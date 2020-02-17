export const getSecretHeaderName = (platform = 'filerobot') => platform === 'filerobot' ?
  `X-Filerobot-Key` : `X-Airstore-Secret-Key`;
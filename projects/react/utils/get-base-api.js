import { getBaseUrl } from './';


export const getBaseAPI = (baseAPI, container, platform) =>
  baseAPI ? baseAPI + '/' : getBaseUrl(container, platform);
import sha1 from 'js-sha1';

export const getImageSealingParams = (paramsStr, imageSealingConfig, originalUrl) => {
  const { salt, char_count: charCount, include_params: includeParams } = imageSealingConfig || {};
  const isIncludeParamsDefined = Array.isArray(includeParams);

  if (isIncludeParamsDefined && includeParams.length === 0) {
    return paramsStr;
  }

  let sealingParamsStr = '';
  let restParamsStr = '';

  if (isIncludeParamsDefined) { // in config defined include_params with array
    const sealingParams = [];
    const restParams = [];

    paramsStr.split('&').forEach(item => {
      const [paramName] = item.split('=');

      if (includeParams.indexOf(paramName) > -1) {
        sealingParams.push(item);
      } else {
        restParams.push(item);
      }
    });

    if (restParams.length > 0) {
      restParamsStr = restParams.join('&');
    }

    if (sealingParams.length > 0) {
      sealingParamsStr = getSealingParams(sealingParams.join('&'), originalUrl, salt, charCount);
    }
  } else { // all params
    restParamsStr = paramsStr;
  }

  return [sealingParamsStr, restParamsStr].filter(p => p).join('&');
}

function encodeBase64(str) {
  return btoa(str).replace(/=*$/g, '');
}

function getSha1(str, length) {
  return sha1(str).slice(0, length);
}

function getSealingParams(paramsStr, originalUrl, salt, charCount) {
  const base64String = encodeBase64(paramsStr);
  const calcHash = getSha1(originalUrl + base64String + salt, charCount);

  return `ci_seal=${calcHash}&ci_eqs=${base64String}`;
}
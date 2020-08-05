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

    // We need to add sealing always, even if sealingParams is empty.
    // In case with empty params sealing will be like: ci_seal=10613a92e5
    sealingParamsStr = getSealingParams(sealingParams.join('&'), originalUrl, salt, charCount);
  } else { // all params
    sealingParamsStr = getSealingParams(paramsStr, originalUrl, salt, charCount);
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

  return [
    calcHash ? `ci_seal=${calcHash}` : '',
    base64String ? `ci_eqs=${base64String}` : '',
  ].filter(i => i).join('&');
}
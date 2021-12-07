/** Internal Dependencies */
import sha1 from './sha1';

const encodeBase64 = (str) => {
  return btoa(str).replace(/=*$/g, '');
};

const getSha1 = (str, length) => {
  return sha1(str).slice(0, length);
};

const getSealingParams = (paramsStr, originalUrl, salt, charCount) => {
  const base64String = encodeBase64(paramsStr);
  const calcHash = getSha1(originalUrl + base64String + salt, charCount);

  return [
    calcHash ? `ci_seal=${calcHash}` : '',
    base64String ? `ci_eqs=${base64String}` : '',
  ]
    .filter((i) => i)
    .join('&');
};

const getImageSealingParams = (paramsStr, imageSealing, originalUrl) => {
  const { salt, charCount, includeParams = [] } = imageSealing || {};
  const isIncludeParamsEmpty = !includeParams || includeParams?.length === 0;

  let sealingParamsStr = '';
  let restParamsStr = '';

  const sealingParams = [];
  const restParams = [];

  paramsStr.split('&').forEach((item) => {
    const [paramName] = item.split('=');

    if (includeParams?.indexOf(paramName) > -1 || isIncludeParamsEmpty) {
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
  sealingParamsStr = getSealingParams(
    sealingParams.join('&'),
    originalUrl,
    salt,
    charCount,
  );

  return [sealingParamsStr, restParamsStr].filter((p) => p).join('&');
};

export default getImageSealingParams;

import getSupportedExtensions from './getSupportedExtensions';

const getFileFullName = (fileName = '', appendedExtension, mediaType) => {
  let finalExtension = appendedExtension;
  let finalFileName = fileName;

  const { possibleTypes, supportedTypes, defaultType } =
    getSupportedExtensions(mediaType);

  if (
    !finalExtension &&
    possibleTypes.some(
      (extension) =>
        fileName.lastIndexOf(`.${extension}`) ===
        fileName.length - `.${extension}`.length,
    )
  ) {
    const currentExtension = fileName
      .slice(fileName.lastIndexOf('.') + 1)
      ?.toLowerCase();
    finalExtension =
      currentExtension && supportedTypes.includes(currentExtension)
        ? currentExtension
        : defaultType;
    finalFileName = fileName.slice(0, fileName.lastIndexOf('.'));
  }

  finalExtension = finalExtension || defaultType;

  return {
    fullName: `${finalFileName}.${finalExtension}`,
    name: finalFileName,
    extension: finalExtension,
  };
};

export default getFileFullName;

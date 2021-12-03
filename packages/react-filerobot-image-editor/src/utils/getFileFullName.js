import { DEFAULT_IMAGE_TYPE, SUPPORTED_IMAGE_TYPES } from './constants';

const getFileFullName = (fileName = '', appendedExtension) => {
  let finalExtension = appendedExtension;
  let finalFileName = fileName;
  if (
    !finalExtension &&
    SUPPORTED_IMAGE_TYPES.some(
      (extension) =>
        fileName.lastIndexOf(`.${extension}`) ===
        fileName.length - `.${extension}`.length,
    )
  ) {
    finalExtension = fileName.slice(fileName.lastIndexOf('.') + 1);
    finalFileName = fileName.slice(0, fileName.lastIndexOf('.'));
  }

  finalExtension = finalExtension || DEFAULT_IMAGE_TYPE;

  return {
    fullName: `${finalFileName}.${finalExtension}`,
    name: finalFileName,
    extension: finalExtension,
  };
};

export default getFileFullName;

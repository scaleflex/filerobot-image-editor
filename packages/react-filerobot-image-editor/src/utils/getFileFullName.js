import {
  DEFAULT_IMAGE_TYPE,
  POSSIBLE_IMAGE_TYPES,
  SUPPORTED_IMAGE_TYPES,
} from './constants';

const getFileFullName = (fileName = '', appendedExtension) => {
  let finalExtension = appendedExtension;
  let finalFileName = fileName;
  if (
    !finalExtension &&
    POSSIBLE_IMAGE_TYPES.some(
      (extension) =>
        fileName.lastIndexOf(`.${extension}`) ===
        fileName.length - `.${extension}`.length,
    )
  ) {
    const currentExtension = fileName
      .slice(fileName.lastIndexOf('.') + 1)
      ?.toLowerCase();
    finalExtension =
      currentExtension && SUPPORTED_IMAGE_TYPES.includes(currentExtension)
        ? currentExtension
        : DEFAULT_IMAGE_TYPE;
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

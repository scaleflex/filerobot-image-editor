import { DEFAULT_EXTENSION, SUPPORTED_EXTENSIONS } from './constants';

const getFileFullName = (fileName) => {
  if (
    SUPPORTED_EXTENSIONS.some(
      (extension) =>
        fileName.lastIndexOf(`.${extension}`) ===
        fileName.length - `.${extension}`.length,
    )
  ) {
    return {
      fullName: fileName,
      name: fileName.slice(0, fileName.lastIndexOf('.')),
      extension: fileName.slice(fileName.lastIndexOf('.') + 1),
    };
  }

  return {
    fullName: `${fileName}.${DEFAULT_EXTENSION}`,
    name: fileName,
    extension: DEFAULT_EXTENSION,
  };
};

export default getFileFullName;

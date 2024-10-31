import {
  DEFAULT_IMAGE_TYPE,
  DEFAULT_VIDEO_TYPE,
  POSSIBLE_IMAGE_TYPES,
  POSSIBLE_VIDEO_TYPES,
  SUPPORTED_IMAGE_TYPES,
  SUPPORTED_VIDEO_TYPES,
} from './constants';
import isImage from './isImage';

const getSupportedExtensions = (sourceType) => {
  const possibleTypes = isImage(sourceType)
    ? POSSIBLE_IMAGE_TYPES
    : POSSIBLE_VIDEO_TYPES;
  const supportedTypes = isImage(sourceType)
    ? SUPPORTED_IMAGE_TYPES
    : SUPPORTED_VIDEO_TYPES;
  const defaultType = isImage(sourceType)
    ? DEFAULT_IMAGE_TYPE
    : DEFAULT_VIDEO_TYPE;

  return { possibleTypes, supportedTypes, defaultType };
};

export default getSupportedExtensions;

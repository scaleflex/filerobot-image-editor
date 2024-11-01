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
  if (isImage(sourceType)) {
    return {
      possibleTypes: POSSIBLE_IMAGE_TYPES,
      supportedTypes: SUPPORTED_IMAGE_TYPES,
      defaultType: DEFAULT_IMAGE_TYPE,
    };
  }
  return {
    possibleTypes: POSSIBLE_VIDEO_TYPES,
    supportedTypes: SUPPORTED_VIDEO_TYPES,
    defaultType: DEFAULT_VIDEO_TYPE,
  };
};

export default getSupportedExtensions;

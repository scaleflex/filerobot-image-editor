import { DEFAULT_SAVE_QUALITY } from './constants';

const getDefaultSaveQuality = (providedDefaultQuality) =>
  providedDefaultQuality <= 0 || providedDefaultQuality > 1
    ? DEFAULT_SAVE_QUALITY
    : providedDefaultQuality;

export default getDefaultSaveQuality;

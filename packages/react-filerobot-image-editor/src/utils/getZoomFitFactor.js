import { DEFAULT_ZOOM_FACTOR } from './constants';

const getZoomFitFactor = (previewDimens, originalDimens) =>
  Math.min(
    previewDimens.width / originalDimens.width,
    previewDimens.height / originalDimens.height,
  ) || DEFAULT_ZOOM_FACTOR;

export default getZoomFitFactor;

/** Internal Dependencies */
import getProperDimensions from 'utils/getProperDimensions';
import mapDimensions from 'utils/mapDimensions';
import useStore from './useStore';

const useMapDimensions = () => {
  const {
    originalSource,
    resize = {},
    adjustments: { crop, rotation = 0 },
    config: { disableResizeAfterRotation },
    shownImageDimensions,
  } = useStore();

  const getCanvasDimensions = () =>
    getProperDimensions(
      resize,
      crop,
      shownImageDimensions,
      disableResizeAfterRotation,
      originalSource,
      rotation,
    );

  const mapDimensionsToOriginal = (dimensions) => {
    const canvasDimensions = getCanvasDimensions();

    return mapDimensions({
      dimensions,
      oldMapDimensions: shownImageDimensions,
      newMapDimensions: canvasDimensions,
    });
  };

  const mapDimensionsToPreview = (dimensions) => {
    const canvasDimensions = getCanvasDimensions();

    return mapDimensions({
      dimensions,
      oldMapDimensions: canvasDimensions,
      newMapDimensions: shownImageDimensions,
    });
  };

  return {
    getCanvasDimensions,
    mapDimensionsToOriginal,
    mapDimensionsToPreview,
  };
};

export default useMapDimensions;

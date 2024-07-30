/** External Dependencies */
import { useCallback } from 'react';

/** Internal Dependencies */
import mapPositionStringToPoint from 'utils/mapPositionStringToPoint';
import { POSITIONS } from 'utils/constants';
import useStore from './useStore';
import useMapDimensions from './useMapDimensions';

const useAnnotationPositioning = (annotation) => {
  const { designLayer } = useStore();
  const { mapDimensionsToPreview } = useMapDimensions();

  const mapPositionStrToPoint = useCallback(
    (newPositionStr) =>
      mapPositionStringToPoint(
        annotation,
        designLayer,
        newPositionStr,
        mapDimensionsToPreview,
      ),
    [annotation, designLayer],
  );

  return { POSITIONS, mapPositionStrToPoint };
};

export default useAnnotationPositioning;

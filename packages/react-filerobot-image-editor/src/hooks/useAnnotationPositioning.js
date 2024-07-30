/** External Dependencies */
import { useCallback } from 'react';

/** Internal Dependencies */
import mapPositionStringToPoint from 'utils/mapPositionStringToPoint';
import { POSITIONS } from 'utils/constants';
import useStore from './useStore';
import useMapDimensions from './useMapDimensions';

const useAnnotationPositioning = (annotation) => {
  const { designLayer } = useStore();
  const { mapDimensionsToPreview, mapDimensionsToOriginal } =
    useMapDimensions();

  const mapPositionStrToPoint = useCallback(
    (newPositionStr) =>
      // We're mapping to original after mapping to preview to provide the preview dimensions, do calculations then revert back to original
      // as it's expected to be used outside of canvas changes.
      mapDimensionsToOriginal(
        mapPositionStringToPoint(
          annotation,
          designLayer,
          newPositionStr,
          mapDimensionsToPreview,
        ),
      ),
    [annotation, designLayer],
  );

  return { POSITIONS, mapPositionStrToPoint };
};

export default useAnnotationPositioning;

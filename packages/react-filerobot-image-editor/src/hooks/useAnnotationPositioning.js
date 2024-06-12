import { useCallback } from 'react';

import mapPositionStringToPoint from 'utils/mapPositionStringToPoint';
import { POSITIONS } from 'utils/constants';
import useStore from './useStore';

const useAnnotationPositioning = (annotation) => {
  const { designLayer } = useStore();

  const mapPositionStrToPoint = useCallback(
    (newPositionStr) =>
      mapPositionStringToPoint(annotation, designLayer, newPositionStr),
    [annotation, designLayer],
  );

  return { POSITIONS, mapPositionStrToPoint };
};

export default useAnnotationPositioning;

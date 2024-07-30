/** External dependencies */
import { useCallback, useMemo } from 'react';

/** Internal dependencies */
import useStore from './useStore';
import useSetAnnotation from './useSetAnnotation';

const useSelectedAnnotations = () => {
  const { annotations, selectionsIds = [] } = useStore();
  const setAnnotation = useSetAnnotation();

  const firstSelectedAnnotationId = selectionsIds[0];
  const firstSelectedAnnotation = annotations[firstSelectedAnnotationId];

  const updateFirstSelectedAnnotation = useCallback(
    (newAnnotationData, isUpdatedFromCanvas) => {
      setAnnotation(
        {
          id: firstSelectedAnnotationId,
          ...newAnnotationData,
        },
        isUpdatedFromCanvas,
      );
    },
    [firstSelectedAnnotationId],
  );

  return useMemo(
    () => ({
      isMultiple: selectionsIds?.length > 1,
      selectedIds: selectionsIds,
      firstSelectedAnnotation,
      updateFirstSelectedAnnotation,
    }),
    [firstSelectedAnnotation, selectionsIds, updateFirstSelectedAnnotation],
  );
};

export default useSelectedAnnotations;

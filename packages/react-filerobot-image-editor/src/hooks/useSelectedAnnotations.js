/** External dependencies */
import { useCallback, useMemo } from 'react';

/** Internal dependencies */
import useStore from './useStore';
import useSetAnnotation from './useSetAnnotation';
import useEditableTextId from './useEditableTextId';

const useSelectedAnnotations = () => {
  const { annotations, selectionsIds = [] } = useStore();
  const setAnnotation = useSetAnnotation();
  const editableTextId = useEditableTextId();

  const firstSelectedAnnotationId = editableTextId || selectionsIds[0];
  const firstSelectedAnnotation =
    annotations[editableTextId] || annotations[firstSelectedAnnotationId];

  const updateFirstSelectedAnnotation = useCallback(
    (newAnnotationData) => {
      setAnnotation({
        id: firstSelectedAnnotationId,
        ...newAnnotationData,
      });
    },
    [firstSelectedAnnotationId],
  );

  return useMemo(
    () => ({
      isMultiple: selectionsIds?.length > 1,
      selectedIds: editableTextId ? [editableTextId] : selectionsIds,
      firstSelectedAnnotation,
      updateFirstSelectedAnnotation,
    }),
    [firstSelectedAnnotation, selectionsIds, updateFirstSelectedAnnotation],
  );
};

export default useSelectedAnnotations;

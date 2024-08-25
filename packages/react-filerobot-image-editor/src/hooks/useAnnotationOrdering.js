/** Internal dependencies */
import { UPDATE_ANNOTATION_IDS } from 'actions';
import restrictNumber from 'utils/restrictNumber';
import useDispatch from './useDispatch';
import useStore from './useStore';

const useAnnotationOrdering = () => {
  const dispatch = useDispatch();
  const { annotationIds } = useStore();

  const updateAnnotationIds = (newAnnotationIds) => {
    dispatch({
      type: UPDATE_ANNOTATION_IDS,
      payload: { annotationIds: newAnnotationIds },
    });
  };

  const bringToFront = (annotationId) => {
    if (annotationIds.includes(annotationId)) {
      updateAnnotationIds([
        ...annotationIds.filter((id) => annotationId !== id),
        annotationId,
      ]);
    }
  };

  const sendToBack = (annotationId) => {
    if (annotationIds.includes(annotationId)) {
      updateAnnotationIds([
        annotationId,
        ...annotationIds.filter((id) => annotationId !== id),
      ]);
    }
  };

  const getReorderedAnnotationIds = (annotationId, steps) => {
    let annotationIndex;

    const newAnnotationIds = annotationIds.filter((id, index) => {
      if (annotationId === id) {
        annotationIndex = index;
        return false;
      }

      return true;
    });

    if (typeof annotationIndex !== 'undefined') {
      newAnnotationIds.splice(
        restrictNumber(annotationIndex + steps, 0, annotationIds.length - 1),
        0,
        annotationId,
      );
    }

    return newAnnotationIds;
  };

  // Forward => Positive steps
  // Backward => Negative steps
  const moveBySteps = (annotationId, steps = 1) => {
    updateAnnotationIds(getReorderedAnnotationIds(annotationId, steps));
  };

  return {
    getReorderedAnnotationIds,
    bringToFront,
    sendToBack,
    moveBySteps,
  };
};

export default useAnnotationOrdering;

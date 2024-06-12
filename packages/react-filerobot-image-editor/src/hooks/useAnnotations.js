import { useCallback, useMemo } from 'react';
import {
  REMOVE_ANNOTATIONS,
  REPLACE_ANNOTATIONS,
  SELECT_ANNOTATION,
} from 'actions';
import useStore from './useStore';
import useSelectedAnnotations from './useSelectedAnnotations';
import useSetAnnotation from './useSetAnnotation';

const useAnnotations = () => {
  const { dispatch, annotations = {} } = useStore();
  const setAnnotation = useSetAnnotation();
  const selectedAnnotations = useSelectedAnnotations();

  const selectAnnotation = useCallback(
    (annotationId, allowSelectMultiple = false) => {
      if (!annotationId) {
        return;
      }

      dispatch({
        type: SELECT_ANNOTATION,
        payload: {
          annotationId,
          multiple: allowSelectMultiple,
        },
      });
    },
    [],
  );

  const removeAnnotations = useCallback((annotationIds = []) => {
    if (!Array.isArray(annotationIds) || annotationIds.length === 0) {
      return;
    }

    dispatch({
      type: REMOVE_ANNOTATIONS,
      payload: {
        annotationsIds: annotationIds,
      },
    });
  }, []);

  const replaceAnnotations = useCallback((newAnnotations, options = {}) => {
    if (!newAnnotations) {
      return;
    }

    dispatch({
      type: REPLACE_ANNOTATIONS,
      payload: {
        ...options,
        newAnnotations,
      },
    });
  }, []);

  return useMemo(
    () => ({
      annotations,
      selectedAnnotations,
      selectAnnotation,
      removeAnnotations,
      replaceAnnotations,
      setAnnotation,
    }),
    [
      annotations,
      selectAnnotation,
      removeAnnotations,
      replaceAnnotations,
      selectedAnnotations,
      setAnnotation,
    ],
  );
};

export default useAnnotations;

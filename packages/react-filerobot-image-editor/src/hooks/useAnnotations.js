import { useCallback, useMemo } from 'react';
import {
  CLEAR_ANNOTATIONS_SELECTIONS,
  DUPLICATE_ANNOTATIONS,
  REMOVE_ANNOTATIONS,
  REPLACE_ANNOTATIONS,
  SELECT_ANNOTATION,
} from 'actions';
import useStore from './useStore';
import useSelectedAnnotations from './useSelectedAnnotations';
import useSetAnnotation from './useSetAnnotation';

const useAnnotations = () => {
  const {
    dispatch,
    annotations = {},
    designLayer,
    config: { onAnnotationAdd } = {},
  } = useStore();
  const setAnnotation = useSetAnnotation();
  const selectedAnnotations = useSelectedAnnotations();

  const selectAnnotation = useCallback(
    (annotationId, allowSelectMultiple = false) => {
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

  const deselectAnnotations = useCallback(() => {
    dispatch({ type: CLEAR_ANNOTATIONS_SELECTIONS });
  }, []);

  const removeAnnotations = useCallback((annotationIds = [], options = {}) => {
    if (!Array.isArray(annotationIds) || annotationIds.length === 0) {
      return;
    }

    dispatch({
      type: REMOVE_ANNOTATIONS,
      payload: {
        ...options,
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

  const duplicateAnnotations = useCallback(
    (annotationIds = [], options = {}) => {
      if (!Array.isArray(annotationIds) || annotationIds.length === 0) {
        return;
      }

      dispatch({
        type: DUPLICATE_ANNOTATIONS,
        payload: {
          ...options,
          annotationsIds: annotationIds,
          onAnnotationAdd,
        },
      });
    },
    [onAnnotationAdd],
  );

  const getAnnotationElementById = useCallback(
    (annotationId) => designLayer.findOne(`#${annotationId}`),
    [designLayer],
  );

  return useMemo(
    () => ({
      annotations,
      selectedAnnotations,
      selectAnnotation,
      deselectAnnotations,
      removeAnnotations,
      replaceAnnotations,
      setAnnotation,
      duplicateAnnotations,
      getAnnotationElementById,
    }),
    [
      annotations,
      selectAnnotation,
      deselectAnnotations,
      removeAnnotations,
      replaceAnnotations,
      selectedAnnotations,
      setAnnotation,
      duplicateAnnotations,
      getAnnotationElementById,
    ],
  );
};

export default useAnnotations;

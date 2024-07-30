/** External dependencies */
import { useCallback } from 'react';

/** Internal dependencies */
import { SET_ANNOTATION } from 'actions';
import useDispatch from './useDispatch';
import useStore from './useStore';

const useSetAnnotation = () => {
  const dispatch = useDispatch();
  const { config = {} } = useStore();

  const setAnnotation = useCallback(
    (annotationPayload, isUpdatedFromCanvas = false) => {
      dispatch({
        type: SET_ANNOTATION,
        payload: {
          applyDimensionsMappingToOriginal: isUpdatedFromCanvas,
          ...annotationPayload,
          onAnnotationAdd: config.onAnnotationAdd,
        },
      });
    },
    [config.onAnnotationAdd],
  );

  return setAnnotation;
};

export default useSetAnnotation;

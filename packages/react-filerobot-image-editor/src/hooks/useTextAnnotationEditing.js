/** External dependencies */
import { useCallback } from 'react';

/** Internal dependencies */
import { ENABLE_TEXT_CONTENT_EDIT, SET_FEEDBACK } from 'actions';
import useStore from './useStore';
import useSetAnnotation from './useSetAnnotation';

const useTextAnnotationEditing = () => {
  const {
    dispatch,
    textIdOfEditableContent,
    t,
    config: { textContentRegex },
  } = useStore();
  const setAnnotation = useSetAnnotation();

  const cancelTextEditing = useCallback(() => {
    dispatch({
      type: ENABLE_TEXT_CONTENT_EDIT,
      payload: {
        textIdOfEditableContent: null,
      },
    });
  }, []);

  const changeTextContent = useCallback(
    (newContent) => {
      if (
        (!newContent && newContent !== 0) ||
        (textContentRegex && textContentRegex.test(newContent))
      ) {
        dispatch({
          type: SET_FEEDBACK,
          payload: {
            feedback: {
              message: t('invalidTextContent'),
            },
          },
        });

        return false;
      }

      setAnnotation({
        id: textIdOfEditableContent,
        text: newContent,
      });
      cancelTextEditing();
      return true;
    },
    [
      setAnnotation,
      cancelTextEditing,
      textIdOfEditableContent,
      textContentRegex,
    ],
  );

  return {
    changeTextContent,
    cancelTextEditing,
    textContentRegex,
  };
};

export default useTextAnnotationEditing;

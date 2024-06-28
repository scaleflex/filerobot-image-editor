/** External dependencies */
import { useCallback, useEffect } from 'react';

/** Internal dependencies */
import { ENABLE_TEXT_CONTENT_EDIT, SET_FEEDBACK } from 'actions';
import {
  activateTextChange,
  deactivateTextChange,
} from 'components/tools/Text/TextOptions/handleTextChangeArea';
import { TRANSFORMERS_LAYER_ID } from 'utils/constants';
import useStore from './useStore';
import useSetAnnotation from './useSetAnnotation';

const useTextAnnotationEditing = () => {
  const {
    dispatch,
    textIdOfEditableContent,
    designLayer,
    t,
    config: { textContentRegex },
  } = useStore();
  const setAnnotation = useSetAnnotation();

  const disableTextEdit = useCallback(() => {
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
        textContentRegex.test(newContent)
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
      disableTextEdit();
      return true;
    },
    [setAnnotation, disableTextEdit, textIdOfEditableContent, textContentRegex],
  );

  useEffect(() => {
    let transformer;
    if (textIdOfEditableContent) {
      const canvasStage = designLayer.getStage();
      [transformer] = canvasStage.findOne(`#${TRANSFORMERS_LAYER_ID}`).children;
      activateTextChange(
        textIdOfEditableContent,
        canvasStage,
        transformer,
        changeTextContent,
        disableTextEdit,
      );
    }

    return () => {
      if (transformer && textIdOfEditableContent) deactivateTextChange();
    };
  }, [textIdOfEditableContent]);
};

export default useTextAnnotationEditing;

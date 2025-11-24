/** External dependencies */
import { SET_SELECTED_TEXT_PART } from 'actions';
import emitCustomEvent from 'utils/emitCustomEvent';
import { EVENTS } from 'utils/constants';

/** Internal dependencies */
import useStore from './useStore';
import useEditableTextId from './useEditableTextId';
import useSetAnnotation from './useSetAnnotation';

const useTextAnnotationPartEditing = () => {
  const { dispatch, annotations, selectedTextPart } = useStore();
  const editableTextId = useEditableTextId();
  const setAnnotation = useSetAnnotation();

  const setCurrentSelectedText = (selectedTextPartData) => {
    dispatch({
      type: SET_SELECTED_TEXT_PART,
      payload: selectedTextPartData,
    });
  };

  const updateAnnotationTextSlice = ({
    annotationId,
    searchValue,
    replaceValue,
    emitUpdateEvent = true,
  }) => {
    const currentAnnotation = annotations[annotationId] || {};
    const currentAnnotationText =
      currentAnnotation.defaultText || currentAnnotation.text;
    if (!currentAnnotation) {
      return;
    }

    let annotationText = Array.isArray(currentAnnotationText)
      ? currentAnnotationText
      : [{ textContent: currentAnnotationText }];

    let newestEndIndex;
    annotationText = annotationText.map(({ textContent, ...rest }) => {
      const { startIndex, endIndex } = rest;
      const newTextContent = textContent.replace(searchValue, replaceValue);

      const newStartIndex =
        typeof startIndex !== 'undefined'
          ? newestEndIndex ?? startIndex
          : undefined;
      newestEndIndex =
        typeof newStartIndex !== 'undefined'
          ? newStartIndex + newTextContent.length
          : endIndex;

      return {
        ...rest,
        ...(typeof newStartIndex !== 'undefined' && {
          startIndex: newStartIndex,
          endIndex: newestEndIndex,
        }),
        textContent: newTextContent,
      };
    });

    setAnnotation({
      id: annotationId,
      text: annotationText,
      tmpText: undefined,
    });

    if (emitUpdateEvent) {
      emitCustomEvent(EVENTS.TEXT_CONTENT_EDITED, {
        id: editableTextId,
        textContent: annotationText,
        annotation: { ...currentAnnotation, text: annotationText },
      });
    }
  };

  const updateAnnotationTextSliceUsingIndices = ({
    annotationId,
    startIndex: contentStartIndex,
    endIndex: contentEndIndex,
    newTextContent,
    emitUpdateEvent = true,
  }) => {
    const currentAnnotation = annotations[annotationId] || {};
    const currentAnnotationText =
      currentAnnotation.defaultText || currentAnnotation.text;
    if (!currentAnnotation) {
      return;
    }

    let annotationText = Array.isArray(currentAnnotationText)
      ? currentAnnotationText
      : [{ textContent: currentAnnotationText }];

    let newestEndIndex;
    annotationText = annotationText.map((part) => {
      const { startIndex, endIndex } = part;

      const usedContentStartIndex = contentStartIndex ?? 0;
      const usedContentEndIndex = contentEndIndex ?? part.textContent.length;
      const usedStartIndex = startIndex ?? 0;
      const usedEndIndex = endIndex ?? part.textContent.length;

      if (
        usedContentStartIndex >= usedStartIndex &&
        usedContentEndIndex <= usedEndIndex
      ) {
        const newContent =
          part.textContent.slice(0, usedContentStartIndex - usedStartIndex) +
          newTextContent +
          part.textContent.slice(
            usedContentEndIndex - usedEndIndex || part.textContent.length,
          );
        const newStartIndex =
          typeof startIndex !== 'undefined'
            ? newestEndIndex ?? startIndex
            : undefined;
        newestEndIndex =
          typeof newStartIndex !== 'undefined'
            ? newStartIndex + newContent.length
            : endIndex;

        return {
          ...part,
          ...(typeof newStartIndex !== 'undefined' && {
            startIndex: newStartIndex,
            endIndex: newestEndIndex,
          }),
          textContent: newContent,
        };
      }

      return part;
    });

    setAnnotation({
      id: annotationId,
      text: annotationText,
      tmpText: undefined,
    });

    if (emitUpdateEvent) {
      emitCustomEvent(EVENTS.TEXT_CONTENT_EDITED, {
        id: editableTextId,
        textContent: annotationText,
        annotation: { ...currentAnnotation, text: annotationText },
      });
    }
  };

  window.xyz = updateAnnotationTextSliceUsingIndices;
  return {
    selectedTextPart,
    setCurrentSelectedText,
    editableTextId,
    updateAnnotationTextSlice,
    updateAnnotationTextSliceUsingIndices,
  };
};

export default useTextAnnotationPartEditing;

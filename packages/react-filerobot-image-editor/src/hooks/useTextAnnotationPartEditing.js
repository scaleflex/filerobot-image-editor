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
      if (!textContent) {
        return rest;
      }

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

  const updateAnnotationTextSlices = (
    annotationId,
    searchReplacePairs = [],
    {
      annotationTextProperty = 'defaultText',
      emitUpdateEvent = true,
      dismissHistory = false,
    } = {},
  ) => {
    const currentAnnotation = annotations[annotationId] || {};
    const currentAnnotationText =
      currentAnnotation[annotationTextProperty] || currentAnnotation.text;
    if (
      !currentAnnotation ||
      !Array.isArray(searchReplacePairs) ||
      searchReplacePairs.length === 0
    ) {
      return;
    }

    let annotationText = Array.isArray(currentAnnotationText)
      ? currentAnnotationText
      : [{ textContent: currentAnnotationText }];

    let newestEndIndex;
    annotationText = annotationText.map((part) => {
      const updatedPart = { ...part };

      let currentText = updatedPart.textContent || '';
      searchReplacePairs.forEach(({ searchValue, replaceValue }) => {
        currentText = currentText?.replace(searchValue, replaceValue);
      });

      const newStartIndex =
        typeof updatedPart.startIndex !== 'undefined'
          ? newestEndIndex ?? updatedPart.startIndex
          : undefined;
      newestEndIndex =
        typeof newStartIndex !== 'undefined'
          ? newStartIndex + currentText.length
          : updatedPart.endIndex;

      return {
        ...updatedPart,
        textContent: currentText,
        ...(typeof newStartIndex !== 'undefined' && {
          startIndex: newStartIndex,
          endIndex: newestEndIndex,
        }),
      };
    });

    setAnnotation({
      id: annotationId,
      text: annotationText,
      tmpText: undefined,
      dismissHistory,
    });

    if (emitUpdateEvent) {
      emitCustomEvent(EVENTS.TEXT_CONTENT_EDITED, {
        id: editableTextId,
        textContent: annotationText,
        annotation: { ...currentAnnotation, text: annotationText },
        dismissHistory,
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
      const usedContentText = part.textContent || currentAnnotationText || '';
      const usedContentEndIndex = contentEndIndex ?? usedContentText.length;
      const usedStartIndex = startIndex ?? 0;
      const usedEndIndex = endIndex ?? usedContentText.length;

      if (
        usedContentStartIndex >= usedStartIndex &&
        usedContentEndIndex <= usedEndIndex
      ) {
        const newContent =
          usedContentText.slice(0, usedContentStartIndex - usedStartIndex) +
          newTextContent +
          usedContentText.slice(
            usedContentEndIndex - usedEndIndex || usedContentText.length,
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

  const updateAnnotationTextSlicesUsingIndices = (
    annotationId,
    textSlices = [],
    {
      annotationTextProperty = 'defaultText',
      emitUpdateEvent = true,
      dismissHistory = false,
    } = {},
  ) => {
    const currentAnnotation = annotations[annotationId] || {};
    const currentAnnotationText =
      currentAnnotation[annotationTextProperty] || currentAnnotation.text;
    if (
      !currentAnnotation ||
      !Array.isArray(textSlices) ||
      textSlices.length === 0
    ) {
      return;
    }

    let annotationText = Array.isArray(currentAnnotationText)
      ? currentAnnotationText
      : [{ textContent: currentAnnotationText }];

    // Process slices in reverse order (highest startIndex first) so that
    // replacing later ranges doesn't shift indices for earlier slices.
    const sortedSlices = [...textSlices].sort(
      (a, b) => (b.startIndex ?? 0) - (a.startIndex ?? 0),
    );

    sortedSlices.forEach(
      ({ startIndex: sliceStart, endIndex: sliceEnd, newTextContent }) => {
        const usedSliceStart = sliceStart ?? 0;
        const usedSliceEnd = sliceEnd ?? 0;
        let isFirstOverlap = true;

        annotationText = annotationText.map((part) => {
          const partText = part.textContent || '';
          const partStart = part.startIndex ?? 0;
          const partEnd = part.endIndex ?? partStart + partText.length;

          // Check for any overlap between slice range and part range
          if (usedSliceStart < partEnd && usedSliceEnd > partStart) {
            const overlapStart = Math.max(usedSliceStart, partStart);
            const overlapEnd = Math.min(usedSliceEnd, partEnd);

            const textBefore = partText.slice(0, overlapStart - partStart);
            const textAfter = partText.slice(overlapEnd - partStart);

            let newContent;
            if (isFirstOverlap) {
              // First overlapping part gets the replacement text
              newContent = textBefore + newTextContent + textAfter;
              isFirstOverlap = false;
            } else {
              // Subsequent overlapping parts just remove the covered portion
              newContent = textBefore + textAfter;
            }

            return {
              ...part,
              textContent: newContent,
            };
          }

          return part;
        });
      },
    );

    // Recalculate startIndex/endIndex for all parts
    let newestEndIndex;
    annotationText = annotationText.map((part) => {
      const newStartIndex =
        typeof part.startIndex !== 'undefined'
          ? newestEndIndex ?? part.startIndex
          : undefined;
      newestEndIndex =
        typeof newStartIndex !== 'undefined'
          ? newStartIndex + (part.textContent?.length ?? 0)
          : part.endIndex;

      const recalculated = {
        ...part,
        ...(typeof newStartIndex !== 'undefined' && {
          startIndex: newStartIndex,
          endIndex: newestEndIndex,
        }),
      };

      return recalculated;
    });

    setAnnotation({
      id: annotationId,
      text: annotationText,
      tmpText: undefined,
      dismissHistory,
    });

    if (emitUpdateEvent) {
      emitCustomEvent(EVENTS.TEXT_CONTENT_EDITED, {
        id: editableTextId,
        textContent: annotationText,
        annotation: { ...currentAnnotation, text: annotationText },
        dismissHistory,
      });
    }
  };

  return {
    selectedTextPart,
    setCurrentSelectedText,
    editableTextId,
    updateAnnotationTextSlice,
    updateAnnotationTextSlices,
    updateAnnotationTextSliceUsingIndices,
    updateAnnotationTextSlicesUsingIndices,
  };
};

export default useTextAnnotationPartEditing;

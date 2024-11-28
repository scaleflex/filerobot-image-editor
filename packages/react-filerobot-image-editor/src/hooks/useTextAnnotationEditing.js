/** External dependencies */
import { useCallback, useState, useMemo, useEffect } from 'react';

/** Internal dependencies */
import {
  ENABLE_TEXT_CONTENT_EDIT,
  SELECT_ANNOTATION,
  SET_FEEDBACK,
  SET_SELECTED_TEXT_PART,
} from 'actions';
import emitCustomEvent from 'utils/emitCustomEvent';
import {
  ALLOWED_TEXT_PART_FORMATS,
  EVENTS,
  UNFOCUSED_MARKED_TEXT_SELECTOR_ID,
} from 'utils/constants';
import {
  cssStyleToJsCanvasProps,
  getCurrentSelectedNodeStyles,
} from 'components/Shared/Layers/DesignLayer/AnnotationNodes/TextNode/TextNode.utils';
import useStore from './useStore';
import useEditableTextId from './useEditableTextId';
import useSetAnnotation from './useSetAnnotation';
import useUpdateEffect from './useUpdateEffect';

const useTextAnnotationEditing = (enableEvents = false) => {
  const {
    dispatch,
    t,
    config: { textContentRegex },
    annotations,
    selectionsIds,
    selectedTextPart,
    shownImageDimensions: { originalSourceInitialScale } = {},
  } = useStore();
  const editableTextId = useEditableTextId();
  const setAnnotation = useSetAnnotation();
  const [activeFormats, setActiveFormats] = useState({});

  const getEditableSelectedUnfocusedTextData = () => {
    const element = document.querySelector(
      `#${UNFOCUSED_MARKED_TEXT_SELECTOR_ID}`,
    );

    if (!element) {
      return undefined;
    }

    return {
      element,
      textContent: element.textContent,
      startIndex: +element.dataset.startIndex,
      endIndex: +element.dataset.endIndex,
    };
  };

  const replaceEditableUnfocusedSelectedText = (textContentString) => {
    if (!textContentString) {
      return;
    }

    const { element, startIndex } =
      getEditableSelectedUnfocusedTextData() || {};
    if (element) {
      if (element.firstElementChild) {
        element.firstElementChild.textContent = textContentString;
        element.replaceChildren(element.firstElementChild);
      } else if (element.firstChild?.nodeName === '#text') {
        const spanContainer = document.createElement('span');
        spanContainer.textContent = textContentString;
        element.replaceChildren(spanContainer);
      } else {
        element.textContent = textContentString;
      }

      element.dataset.endIndex =
        parseInt(startIndex, 10) +
        textContentString.replaceAll('\n', '').length -
        1;
    }
  };

  const setCurrentSelectedText = (selectedTextPartData) => {
    dispatch({
      type: SET_SELECTED_TEXT_PART,
      payload: selectedTextPartData,
    });
  };

  const currentAnnotation = useMemo(() => {
    const editableTextAnnotation = annotations[editableTextId];
    if (editableTextAnnotation) {
      return {
        ...editableTextAnnotation,
        ...activeFormats,
      };
    }

    return annotations[selectionsIds[0]];
  }, [annotations, editableTextId, selectionsIds, activeFormats]);

  const cancelTextEditing = useCallback(
    (removeTmpText = true, reselectAfterEditCancellation = true) => {
      dispatch({
        type: ENABLE_TEXT_CONTENT_EDIT,
        payload: {
          editableTextId: null,
        },
      });

      if (reselectAfterEditCancellation) {
        dispatch({
          type: SELECT_ANNOTATION,
          payload: { annotationId: currentAnnotation.id },
        });
      }

      if (removeTmpText) {
        setAnnotation({
          id: editableTextId,
          tmpText: undefined,
        });
      }
    },
    [editableTextId, setAnnotation],
  );

  const commitTextUpdates = (textContent = '', tmpFormattedText = []) => {
    if (textContentRegex && textContentRegex.test(textContent)) {
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

    if (Array.isArray(tmpFormattedText) && tmpFormattedText.length > 0) {
      setAnnotation({
        id: editableTextId,
        text: tmpFormattedText,
        tmpText: undefined,
      });

      emitCustomEvent(EVENTS.TEXT_CONTENT_EDITED, {
        id: editableTextId,
        textContent,
        formattedText: tmpFormattedText,
        annotation: { ...currentAnnotation, text: tmpFormattedText },
      });
    }

    cancelTextEditing(false);
    return true;
  };

  const updateTextFormats = (newFormats = {}) => {
    const hasNoSelection =
      !editableTextId ||
      (window.getSelection().isCollapsed &&
        !getEditableSelectedUnfocusedTextData()?.element);

    if (
      hasNoSelection ||
      Object.keys(newFormats).some(
        (key) => !ALLOWED_TEXT_PART_FORMATS.includes(key),
      )
    ) {
      let disregardTextEditing = false;
      const { generalTextFormats, textPartFormats } = Object.keys(
        newFormats,
      ).reduce(
        (splittedFormats, formatKey) => {
          if (ALLOWED_TEXT_PART_FORMATS.includes(formatKey)) {
            return {
              ...splittedFormats,
              textPartFormats: {
                ...splittedFormats.textPartFormats,
                [formatKey]: newFormats[formatKey],
              },
            };
          }

          if (
            !disregardTextEditing &&
            (formatKey.startsWith('stroke') || formatKey.startsWith('shadow'))
          ) {
            disregardTextEditing = true;
          }

          return {
            ...splittedFormats,
            generalTextFormats: {
              ...splittedFormats.generalTextFormats,
              [formatKey]: newFormats[formatKey],
            },
          };
        },
        { generalTextFormats: undefined, textPartFormats: undefined },
      );

      setAnnotation({
        id: currentAnnotation.id,
        dismissHistory: Boolean(editableTextId),
        text:
          Array.isArray(currentAnnotation.text) && textPartFormats
            ? currentAnnotation.text.map((textPart) => ({
                ...textPart,
                style: {
                  ...textPart.style,
                  ...textPartFormats,
                },
              }))
            : currentAnnotation.text,
        ...generalTextFormats,
        ...textPartFormats,
      });
      setActiveFormats((currentActiveFormats) => ({
        ...currentActiveFormats,
        ...generalTextFormats,
        ...textPartFormats,
      }));

      if (disregardTextEditing) {
        cancelTextEditing(true);
      }

      return;
    }

    emitCustomEvent(EVENTS.APPLY_TEXT_FORMAT, newFormats);
  };

  const updateActiveFormats = () => {
    const selection = window.getSelection();
    const { element, textContent, startIndex, endIndex } =
      getEditableSelectedUnfocusedTextData() || {};

    setCurrentSelectedText({
      textContent,
      element,
      startIndex,
      endIndex, // inclusive
      hasSelection: !selection.isCollapsed || Boolean(element),
    });

    if (selection.rangeCount === 0 && !element) {
      setActiveFormats({});
      return;
    }

    const range = !element && selection.getRangeAt(0);
    const parentOfSelectedContent = element || range.commonAncestorContainer;
    const selectedContent = !element && range.cloneContents().firstElementChild;
    if (!parentOfSelectedContent) {
      return;
    }

    const currentFormats = getCurrentSelectedNodeStyles(
      (parentOfSelectedContent.nodeName !== '#text' &&
        (parentOfSelectedContent.firstElementChild ||
          parentOfSelectedContent.firstChild)) ||
        parentOfSelectedContent,
      selectedContent?.style
        ? cssStyleToJsCanvasProps(
            selectedContent.style.cssText,
            originalSourceInitialScale,
          )
        : {},
      { originalSourceInitialScale },
    );

    setActiveFormats(currentFormats);
  };

  const triggerTextSaveAndClose = () => {
    if (editableTextId) {
      emitCustomEvent(EVENTS.SAVE_EDITED_TEXT_CONTENT);
    }
  };

  useUpdateEffect(() => {
    if (currentAnnotation?.tmpText) {
      updateActiveFormats();
    }
  }, [currentAnnotation?.tmpText]);

  useEffect(() => {
    if (editableTextId && enableEvents) {
      document.addEventListener('selectionchange', updateActiveFormats);
    }

    return () => {
      if (enableEvents) {
        document.removeEventListener('selectionchange', updateActiveFormats);
      }

      setCurrentSelectedText({});
    };
  }, [editableTextId, enableEvents, originalSourceInitialScale]);

  return {
    currentTextAnnotation: currentAnnotation,
    commitTextUpdates, // used for saving the updates and text content with validation before saving
    updateTextFormats, // used for updating the text properties whether globally or selected includes commitTextUpdates inside.
    cancelTextEditing,
    textContentRegex,
    getEditableSelectedUnfocusedTextData,
    replaceEditableUnfocusedSelectedText,
    selectedTextPart,
    editableTextId,
    triggerTextSaveAndClose, // calls the save current edited text event and cancel afterwards
  };
};

export default useTextAnnotationEditing;

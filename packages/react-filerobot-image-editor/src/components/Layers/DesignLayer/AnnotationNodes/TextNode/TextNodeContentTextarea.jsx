/* eslint-disable react/no-array-index-key */
/** External Dependencies */
import React, { useRef, useEffect, Fragment, useCallback } from 'react';
import { Html } from 'react-konva-utils';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import {
  useSetAnnotation,
  useStore,
  useTextAnnotationEditing,
  useUpdateEffect,
} from 'hooks';
import {
  ALLOWED_TEXT_PART_FORMATS,
  EVENTS,
  TEXT_EDITOR_ID,
  UNFOCUSED_MARKED_TEXT_SELECTOR_ID,
} from 'utils/constants';
import getNodeText from 'utils/getNodeText';
import { StyledTextNodeContentTextarea } from './TextNode.styled';
import {
  getNewFormattedContent,
  getQuotedFontFamily,
  pushNodeFlattenedContent,
  recursivelyRemoveCssProperties,
  dispatchTextContentChangingEvent,
} from './TextNode.utils';

const getPreparedStyle = ({
  fontWeight,
  fontStyle,
  fontSize,
  fontFamily,
  fill: color,
  letterSpacing,
  baselineShift,
}) => ({
  fontWeight,
  fontStyle,
  fontSize,
  color,
  letterSpacing: letterSpacing && `${letterSpacing}px`,
  transform: `translateY(${-baselineShift}px)`,
  display: baselineShift && 'inline-block',
  fontFamily: getQuotedFontFamily(fontFamily),
});

let timeoutId;

const TextNodeContentTextarea = ({
  id,
  fill,
  opacity,
  fontFamily,
  fontSize,
  fontWeight,
  fontStyle,
  letterSpacing,
  lineHeight,
  textAlign,
  verticalAlign,
  text,
  width,
  height,
}) => {
  const textareaRef = useRef();
  const previousTextRef = useRef('');
  const { toolId, designLayer } = useStore();
  const setAnnotation = useSetAnnotation();
  const {
    commitTextUpdates,
    cancelTextEditing,
    getEditableSelectedUnfocusedTextData,
  } = useTextAnnotationEditing(true);

  const getFormattedText = () => {
    const flattenedTextContent = [];
    pushNodeFlattenedContent(flattenedTextContent, textareaRef.current, {});

    return flattenedTextContent;
  };

  const updateAnnotationWithTmpText = (globalProps) => {
    setAnnotation({
      ...globalProps,
      id,
      tmpText: getFormattedText(),
      dismissHistory: true,
    });
  };

  const updatePreviousTextRef = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      if (textareaRef.current) {
        previousTextRef.current = Array.isArray(text)
          ? text.map(({ textContent = '' } = {}) => textContent).join('')
          : text;
      }
    }, 0);
  };

  const assignTextextareaRef = useCallback((node) => {
    textareaRef.current = node;

    if (textareaRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(textareaRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);

      // Initialize previous text (synchronousl in-case we need to use it immediately)
      previousTextRef.current = textareaRef.current.innerText;
    }
  }, []);

  const handleInputChange = () => {
    if (textareaRef.current) {
      const changes = dispatchTextContentChangingEvent(
        textareaRef,
        previousTextRef.current,
        id,
      );
      previousTextRef.current = changes.newText;
      updateAnnotationWithTmpText();
    }
  };

  const saveFormattedText = () => {
    const { innerText } = textareaRef.current;
    return commitTextUpdates(innerText, getFormattedText());
  };

  const saveFormattedTextAndCancel = (
    reselectAfterSaving = true,
    avoidEditingCancel = false,
  ) => {
    if (saveFormattedText() && !avoidEditingCancel) {
      cancelTextEditing(false, reselectAfterSaving);
    }
  };

  const handleCanvasClick = () => {
    saveFormattedTextAndCancel(false);
  };

  const handleOnTextFormatApply = (event) => {
    const { detail: newFormats } = event || {};
    const selection = window.getSelection();
    if (
      selection.rangeCount === 0 ||
      !newFormats ||
      Object.keys(newFormats).some(
        (name) => !ALLOWED_TEXT_PART_FORMATS.includes(name),
      )
    ) {
      return;
    }

    const updatedFormats = { ...newFormats };
    if (
      typeof updatedFormats.fontSize !== 'undefined' &&
      (typeof updatedFormats.fontSize === 'number' ||
        !updatedFormats.fontSize.endsWith('px'))
    ) {
      updatedFormats.fontSize = `${updatedFormats.fontSize}px`;
    }

    if (typeof updatedFormats.letterSpacing !== 'undefined') {
      updatedFormats.letterSpacing = `${parseFloat(
        updatedFormats.letterSpacing,
      )}px`;
    }

    if (typeof updatedFormats.baselineShift !== 'undefined') {
      updatedFormats.transform = `translateY(${-updatedFormats.baselineShift}px)`;
      updatedFormats.display = 'inline-block';
      delete updatedFormats.baselineShift;
    }

    if (newFormats.fill) {
      updatedFormats.color = updatedFormats.fill;
      delete updatedFormats.fill;
    }

    const range = selection.getRangeAt(0);
    const isNoSelectedText = selection.isCollapsed;
    const selectedUnfocusedTextElement =
      isNoSelectedText && getEditableSelectedUnfocusedTextData()?.element;
    const targetContent = isNoSelectedText
      ? selectedUnfocusedTextElement || textareaRef.current
      : range.extractContents();
    const isWholeTextSelected =
      getNodeText(targetContent)?.length ===
      getNodeText(textareaRef.current)?.length;

    const newFormatKeys = Object.keys(updatedFormats);
    if (isNoSelectedText && !selectedUnfocusedTextElement) {
      recursivelyRemoveCssProperties(textareaRef.current, newFormatKeys);
    }
    const newFormattedContent = getNewFormattedContent(
      targetContent,
      updatedFormats,
    );

    if (targetContent !== newFormattedContent[0]) {
      targetContent.replaceChildren(...newFormattedContent);
    }

    if (!isNoSelectedText) {
      range.insertNode(targetContent);
    }

    // We're passing newFormats instead of updatedFormats as theses formats will be passed to the canvas (no transformations needed then!)
    updateAnnotationWithTmpText(isWholeTextSelected && newFormats);
  };

  const handleTextareaKeyDown = (event) => {
    // hide on enter
    // but don't hide on shift + enter
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        event.preventDefault();
        event.stopPropagation();
        saveFormattedTextAndCancel();
      }

      return;
    }

    // on esc do not set value back to node
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      cancelTextEditing();
    }
  };

  const disregardSelectionEffect = () => {
    const markElement = getEditableSelectedUnfocusedTextData()?.element;

    if (markElement) {
      const newFragment = document.createDocumentFragment();
      const childNodes = [];

      markElement.childNodes.forEach((node, index, nodes) => {
        if (node.nodeName === 'BR') {
          childNodes.push(node);
          return;
        }

        if (!node.textContent && node.textContent !== 0) {
          return;
        }

        const prevNode = index > 0 ? nodes[index - 1] : undefined;
        const isDetachedNode = node.dataset?.detached === 'true';
        if (
          prevNode?.nodeName === '#text' &&
          node.nodeName === '#text' &&
          !isDetachedNode
        ) {
          prevNode.textContent = `${prevNode.textContent}${node.textContent}`;
        } else {
          childNodes.push(node);
        }
      });

      if (
        markElement.previousSibling?.nodeName === '#text' &&
        childNodes[0].nodeName === '#text' &&
        childNodes[0].dataset?.detached !== 'true'
      ) {
        childNodes[0].textContent = `${markElement.previousSibling.textContent}${childNodes[0].textContent}`;
        markElement.previousSibling.remove();
      }

      const lastChildNode = childNodes[childNodes.length - 1];
      if (
        markElement.nextSibling?.nodeName === '#text' &&
        lastChildNode.nodeName === '#text' &&
        lastChildNode.dataset?.detached !== 'true'
      ) {
        lastChildNode.textContent = `${lastChildNode.textContent}${markElement.nextSibling.textContent}`;
        markElement.nextSibling.remove();
      }

      newFragment.replaceChildren(...childNodes);
      markElement.replaceWith(newFragment);

      const selection = window.getSelection();
      selection.removeAllRanges();
    }
  };

  const keepSelectionOnBlur = () => {
    const selection = window.getSelection();
    if (selection.rangeCount <= 0 || selection.isCollapsed) {
      return;
    }

    const range = selection.getRangeAt(0);

    const flatContent = range.extractContents();
    const markElement = document.createElement('mark');
    markElement.id = UNFOCUSED_MARKED_TEXT_SELECTOR_ID;
    markElement.appendChild(flatContent);
    selection.removeAllRanges();
    range.insertNode(markElement);

    // Calling it to add the indices of the selection on the mark element.
    getFormattedText();
  };

  const handleOnPaste = (event) => {
    event.preventDefault();

    const textToPaste = (event.clipboardData || window.clipboardData)
      .getData('text/plain')
      ?.split(/\r?\n/);

    const textWrapper = document.createDocumentFragment();
    textToPaste.forEach((textLine, i) => {
      if (i !== 0) {
        textWrapper.appendChild(document.createElement('br'));
      }

      textWrapper.appendChild(document.createTextNode(textLine));
    });

    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(textWrapper);
    selection.collapseToEnd();

    // Dispatch text content changing event after paste
    handleInputChange();
  };

  useEffect(() => {
    const saveTextAndCancelWithoutSelecting = ({
      detail: { avoidEditingCancel = false },
    } = {}) => {
      saveFormattedTextAndCancel(false, avoidEditingCancel);
    };

    window?.addEventListener(
      EVENTS.SAVE_EDITED_TEXT_CONTENT,
      saveTextAndCancelWithoutSelecting,
    );

    return () => {
      window?.removeEventListener(
        EVENTS.SAVE_EDITED_TEXT_CONTENT,
        saveTextAndCancelWithoutSelecting,
      );
    };
  }, []);

  useEffect(() => {
    updatePreviousTextRef();
  }, [text]);

  useEffect(() => {
    const canvas = designLayer?.getStage();
    if (window) {
      // the event here should be on the editor's container only not the whole window to not cause an issue with rest of doc.
      canvas.on('click', handleCanvasClick);
      window.addEventListener(
        EVENTS.APPLY_TEXT_FORMAT,
        handleOnTextFormatApply,
      );
    }

    return () => {
      canvas.off('click', handleCanvasClick);
      window?.removeEventListener(
        EVENTS.APPLY_TEXT_FORMAT,
        handleOnTextFormatApply,
      );

      timeoutId = null;
    };
  }, []);

  useUpdateEffect(() => {
    if (textareaRef.current) {
      const isTextUpdated = saveFormattedText();
      cancelTextEditing(!isTextUpdated, false);
    }
  }, [toolId]);

  const renderTextContent = (textContent) =>
    textContent.split('\n').map((lineTextContent, i) => (
      <Fragment key={i}>
        {i !== 0 && <br />}
        {lineTextContent}
      </Fragment>
    ));

  return (
    <Html>
      <StyledTextNodeContentTextarea
        id={TEXT_EDITOR_ID}
        ref={assignTextextareaRef}
        onKeyDown={handleTextareaKeyDown}
        onBlur={keepSelectionOnBlur}
        onFocus={disregardSelectionEffect}
        onInput={handleInputChange}
        contentEditable
        suppressContentEditableWarning
        $width={width}
        $height={height}
        $textAlign={textAlign}
        $verticalAlign={verticalAlign}
        $opacity={opacity}
        onPaste={handleOnPaste}
        // The styles that would be reused in the character formatting should be added inside style to be retrieved in teh characters formatting through elem.style.cssText
        style={{
          color: fill,
          fontFamily: getQuotedFontFamily(fontFamily),
          fontSize,
          letterSpacing: letterSpacing && `${letterSpacing}px`,
          lineHeight,
          fontWeight,
          fontStyle,
        }}
      >
        {Array.isArray(text)
          ? // eslint-disable-next-line default-param-last
            text.map(
              ({ textContent = '', style, isDetached } = {}, index = 0) => (
                <span
                  style={getPreparedStyle(style || {})}
                  key={index}
                  data-detached={isDetached}
                >
                  {renderTextContent(textContent)}
                </span>
              ),
            )
          : renderTextContent(text)}
      </StyledTextNodeContentTextarea>
    </Html>
  );
};

TextNodeContentTextarea.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        fontFamily: PropTypes.string,
        fontStyle: PropTypes.string,
        fontWeight: PropTypes.string,
        fontSize: PropTypes.number,
        fill: PropTypes.string,
        letterSpacing: PropTypes.number,
        baselineShift: PropTypes.number,
      }),
    ),
  ]).isRequired,
  fill: PropTypes.string,
  fontFamily: PropTypes.string,
  fontWeight: PropTypes.string,
  fontStyle: PropTypes.string,
  textAlign: PropTypes.string,
  verticalAlign: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  opacity: PropTypes.number,
  fontSize: PropTypes.number,
  letterSpacing: PropTypes.number,
  lineHeight: PropTypes.number,
};

export default TextNodeContentTextarea;

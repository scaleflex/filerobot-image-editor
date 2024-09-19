/* eslint-disable react/no-array-index-key */
/** External Dependencies */
import React, { useRef, useEffect, Fragment } from 'react';
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
import { StyledTextNodeContentTextarea } from './TextNode.styled';
import {
  getNewFormattedContent,
  pushNodeFlattenedContent,
  recursivelyRemoveCssProperties,
} from './TextNode.utils';

const getPreparedStyle = (
  {
    fontWeight,
    fontStyle,
    fontSize,
    fontFamily,
    fill: color,
    letterSpacing,
    baselineShift,
  },
  originalSourceInitialScale,
) => ({
  fontWeight,
  fontStyle,
  fontSize,
  color,
  letterSpacing: letterSpacing && letterSpacing * originalSourceInitialScale,
  transform: `translateY(${-baselineShift * originalSourceInitialScale}px)`,
  display: baselineShift && 'inline-block',
  fontFamily,
});

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
  text,
  width,
  height,
}) => {
  const textareaRef = useRef();
  const {
    toolId,
    designLayer,
    shownImageDimensions: { originalSourceInitialScale = 1 } = {},
  } = useStore();
  const setAnnotation = useSetAnnotation();
  const {
    commitTextUpdates,
    cancelTextEditing,
    getEditableSelectedUnfocusedTextData,
  } = useTextAnnotationEditing(true);

  const getFormattedText = () => {
    const flattenedTextContent = [];
    pushNodeFlattenedContent(
      flattenedTextContent,
      textareaRef.current,
      {},
      { originalSourceInitialScale },
    );

    return flattenedTextContent;
  };

  const updateAnnotationWithTmpText = () => {
    setAnnotation({
      id,
      tmpText: getFormattedText(),
      dismissHistory: true,
    });
  };

  const saveFormattedText = () => {
    const { textContent } = textareaRef.current;
    return commitTextUpdates(textContent, getFormattedText());
  };

  const saveFormattedTextAndCancel = (reselectAfterSaving = true) => {
    if (saveFormattedText()) {
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

    if (updatedFormats.letterSpacing) {
      updatedFormats.letterSpacing = `${
        parseFloat(updatedFormats.letterSpacing) * originalSourceInitialScale
      }px`;
    }

    if (updatedFormats.baselineShift) {
      updatedFormats.transform = `translateY(${
        -updatedFormats.baselineShift * originalSourceInitialScale
      }px)`;
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

    updateAnnotationWithTmpText();
  };

  const handleTextareaKeyDown = (event) => {
    // hide on enter
    // but don't hide on shift + enter
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        event.preventDefault();
        saveFormattedTextAndCancel();
      }

      return;
    }

    // on esc do not set value back to node
    if (event.key === 'Escape') {
      event.preventDefault();
      cancelTextEditing();
    }
  };

  const disregardSelectionEffect = () => {
    const markElement = getEditableSelectedUnfocusedTextData()?.element;

    if (markElement) {
      const newFragment = document.createDocumentFragment();
      const childNodes = [];

      markElement.childNodes.forEach((node, index, nodes) => {
        const prevNode = nodes[index - 1];
        const isVariable = node.textContent.startsWith('$');
        if (
          prevNode?.nodeName === '#text' &&
          node.nodeName === '#text' &&
          !isVariable
        ) {
          prevNode.textContent = `${prevNode.textContent}${node.textContent}`;
        } else {
          childNodes.push(node);
        }
      });

      if (
        markElement.previousSibling?.nodeName === '#text' &&
        childNodes[0].nodeName === '#text' &&
        !childNodes[0].textContent.startsWith('$')
      ) {
        childNodes[0].textContent = `${markElement.previousSibling.textContent}${childNodes[0].textContent}`;
        markElement.previousSibling.remove();
      }

      const lastChildNode = childNodes[childNodes.length - 1];
      if (
        markElement.nextSibling?.nodeName === '#text' &&
        lastChildNode.nodeName === '#text' &&
        !lastChildNode.textContent.startsWith('$')
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

    const textToPaste = (event.clipboardData || window.clipboardData).getData(
      'text',
    );
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(textToPaste));
    selection.collapseToEnd();
  };

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
    };
  }, [originalSourceInitialScale]);

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
        ref={textareaRef}
        onKeyDown={handleTextareaKeyDown}
        onBlur={keepSelectionOnBlur}
        onFocus={disregardSelectionEffect}
        contentEditable
        suppressContentEditableWarning
        $width={width}
        $height={height}
        $textAlign={textAlign}
        $opacity={opacity}
        onPaste={handleOnPaste}
        // The styles that would be reused in the character formatting should be added inside style to be retrieved in teh characters formatting through elem.style.cssText
        style={{
          color: fill,
          fontFamily,
          fontSize,
          letterSpacing,
          lineHeight,
          fontWeight,
          fontStyle,
        }}
      >
        {Array.isArray(text)
          ? // eslint-disable-next-line default-param-last
            text.map(({ textContent = '', style } = {}, index) => (
              <span
                style={getPreparedStyle(style, originalSourceInitialScale)}
                key={index}
              >
                {renderTextContent(textContent)}
              </span>
            ))
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
  width: PropTypes.number,
  height: PropTypes.number,
  opacity: PropTypes.number,
  fontSize: PropTypes.number,
  letterSpacing: PropTypes.number,
  lineHeight: PropTypes.number,
};

export default TextNodeContentTextarea;

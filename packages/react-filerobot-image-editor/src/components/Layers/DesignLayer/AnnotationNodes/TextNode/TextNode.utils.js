/* eslint-disable no-plusplus */
/** Internal dependencies */
import { EVENTS, TEXT_EDITOR_ID } from 'utils/constants';
import emitCustomEvent from 'utils/emitCustomEvent';
import getNodeText from 'utils/getNodeText';
import rgbaToHexWithOpacity from 'utils/rgbaToHexa';

export const getQuotedFontFamily = (fontFamily) =>
  fontFamily && `"${fontFamily.replaceAll('"', '')}"`;

const jsCanvasCssPropToCssTextProp = (jsStyleKey) => {
  if (jsStyleKey === 'fill') {
    return 'color';
  }

  if (jsStyleKey === 'baselineShift') {
    return 'transform';
  }

  return `${jsStyleKey.replaceAll(
    /[A-Z]/g,
    (match) => `-${match.toLowerCase()}`,
  )}`;
};

export const jsStyleToCssText = (jsStyles) =>
  Object.keys(jsStyles || {})
    .map(
      (styleKey) =>
        `${jsCanvasCssPropToCssTextProp(styleKey)}: ${
          Number.isFinite(jsStyles[styleKey])
            ? `${jsStyles[styleKey]}px`
            : jsStyles[styleKey]
        };`,
    )
    .join(' ');

export const cssStyleToJsCanvasProps = (cssTextStyle) => {
  if (!cssTextStyle) {
    return {};
  }

  const jsStyles = {};
  cssTextStyle.split(/;\s*/).forEach((style) => {
    if (!style) {
      return;
    }
    const [key, value] = style.split(/:\s*/);

    const preparedKey = key.replaceAll(
      /-([a-z])/g,
      (_match, matchedGroup) =>
        `${matchedGroup[0].toUpperCase()}${matchedGroup.slice(1)}`,
    );
    jsStyles[preparedKey] =
      value?.toLowerCase().endsWith('px') || /^[0-9]*$/.test(value)
        ? parseFloat(value)
        : value?.replaceAll('"', '');
  });

  if (jsStyles.color) {
    jsStyles.fill = jsStyles.color;
    delete jsStyles.color;
  }

  // transform is used only for baselineShift so we are using it safely till now.
  if (jsStyles.transform) {
    // - to reverse the current direction as baseline and transform are opposite directions for each other.
    jsStyles.baselineShift = -parseFloat(
      jsStyles.transform.match(/\((.*)px\)/)[1],
    );
    delete jsStyles.transform;
  }

  if (typeof jsStyles.letterSpacing !== 'undefined') {
    jsStyles.letterSpacing = parseFloat(jsStyles.letterSpacing);
  }

  return jsStyles;
};

export const getNewFormattedContent = (selectedContent, formats) => {
  const newContent = [];
  const newFormats = { ...formats };

  Array.from(selectedContent.childNodes).forEach((node, i) => {
    if (node.nodeName === 'BR') {
      newContent.push(node);
      return;
    }

    const nodeTextContent = getNodeText(node);
    if (!nodeTextContent) {
      return;
    }

    let newNode = node;
    if (node.nodeName === '#text') {
      const { parentNode } = node;
      if (parentNode.style?.cssText.includes(jsStyleToCssText(newFormats))) {
        return;
      }
      const isSameTextAndHasStylableParent =
        getNodeText(parentNode) === getNodeText(node) &&
        parentNode?.style &&
        parentNode.nodeName !== 'MARK';
      newNode =
        (isSameTextAndHasStylableParent && parentNode) ||
        document.createElement('span');

      if (!isSameTextAndHasStylableParent) {
        newNode.innerText = nodeTextContent;
      }
    }

    if (newFormats.fontFamily) {
      newFormats.fontFamily = getQuotedFontFamily(newFormats.fontFamily);
    }

    Object.assign(newNode.style, newFormats);

    if (
      i > 0 &&
      nodeTextContent &&
      newNode.style.cssText === newContent[i - 1]?.style.cssText
    ) {
      newContent[i - 1].innerText = `${
        newContent[i - 1].innerText
      }${nodeTextContent}`;
      return;
    }

    newContent.push(newNode);
  });

  return newContent;
};

export const pushNodeFlattenedContent = (
  flattenedContent,
  node,
  wrapperStyles = {},
) => {
  const isLineBreakNode = node.nodeName === 'BR';

  // Avoid totally empty nodes.
  // we are using node.textContent here instead of innerText to make sure that the text has content as innerText keeps value even if text removed from DOM.
  if (
    node.nodeName === '#text' &&
    !node.textContent &&
    node.textContent !== 0 &&
    !isLineBreakNode
  ) {
    return;
  }

  // we are using .textContent cause '#text' doesn't have innerText
  if ((node.nodeName === '#text' && node.textContent) || isLineBreakNode) {
    const lastNode = flattenedContent[flattenedContent.length - 1];
    const startIndex = lastNode?.endIndex || 0;
    const nodeContent = isLineBreakNode ? '\n' : node.textContent;

    if (
      lastNode &&
      !lastNode.textContent.startsWith('$') &&
      !nodeContent.startsWith('$') && // if variable keep it separate.
      JSON.stringify(wrapperStyles) === JSON.stringify(lastNode.style)
    ) {
      lastNode.textContent = `${lastNode.textContent}${nodeContent}`;
      lastNode.endIndex = lastNode.startIndex + lastNode.textContent.length;
    } else {
      const endIndex = startIndex + (nodeContent.length || 1);
      flattenedContent.push({
        style: wrapperStyles,
        textContent: nodeContent,
        startIndex,
        endIndex,
      });
    }

    const markElement =
      (node.parentNode.nodeName === 'MARK' && node.parentNode) ||
      (node.parentNode.parentNode?.nodeName === 'MARK' &&
        node.parentNode.parentNode);
    if (markElement) {
      if (getNodeText(markElement).startsWith(node.textContent)) {
        // eslint-disable-next-line no-param-reassign
        markElement.dataset.startIndex = startIndex;
      }

      if (getNodeText(markElement).endsWith(node.textContent)) {
        // eslint-disable-next-line no-param-reassign
        markElement.dataset.endIndex =
          (parseInt(markElement.dataset.startIndex, 10) || 0) +
          getNodeText(markElement).length;
      }
    }

    return;
  }

  const wrapperNodeStyle = cssStyleToJsCanvasProps(node.style.cssText);
  node.childNodes.forEach((currentNode) => {
    if (!getNodeText(currentNode) && currentNode.nodeName !== 'BR') {
      return;
    }

    pushNodeFlattenedContent(flattenedContent, currentNode, {
      ...wrapperStyles,
      ...wrapperNodeStyle,
    });
  });
};

export const recursivelyRemoveCssProperties = (
  node,
  cssPropertiesToRemove = [],
) => {
  if (node.nodeName === '#text') {
    return;
  }

  node.childNodes.forEach((childNode) => {
    if (childNode.style?.cssText) {
      cssPropertiesToRemove.forEach((newFormatKey) =>
        childNode.style.removeProperty(
          jsCanvasCssPropToCssTextProp(newFormatKey),
        ),
      );
    }

    recursivelyRemoveCssProperties(childNode, cssPropertiesToRemove);
  });
};

export const getCurrentSelectedNodeStyles = (node, currentStyles = {}) => {
  if (!node) {
    return currentStyles;
  }

  const newStyles = {
    ...(node.style && cssStyleToJsCanvasProps(node.style.cssText)),
    ...currentStyles,
  };

  if (node.id === TEXT_EDITOR_ID || node.contentEditable === 'true') {
    if (newStyles.fill) {
      newStyles.fill = `#${rgbaToHexWithOpacity(newStyles.fill).hex}`;
    }
    return newStyles;
  }

  return getCurrentSelectedNodeStyles(node.parentNode, newStyles);
};

export const calculateTextChanges = (textareaRef, previousText) => {
  const currentText = textareaRef.current.innerText;
  const selection = window.getSelection();

  let caretPosition = 0;
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(textareaRef.current);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretPosition = preCaretRange.toString().length;
  }

  // Calculate character difference
  let charsDiff = 0;

  if (previousText !== undefined) {
    charsDiff = currentText.length - previousText.length;

    // Find the actual changed text (for paste/input operations)
    if (charsDiff > 0) {
      // Text was replaced (same length but different content)
      // Find the changed portion by comparing character by character
      let startDiff = 0;
      let endDiff = 0;

      // Find where the difference starts
      while (
        startDiff < previousText.length &&
        startDiff < currentText.length &&
        previousText[startDiff] === currentText[startDiff]
      ) {
        startDiff++;
      }

      // Find where the difference ends from the end
      while (
        endDiff < previousText.length - startDiff &&
        endDiff < currentText.length - startDiff &&
        previousText[previousText.length - 1 - endDiff] ===
          currentText[currentText.length - 1 - endDiff]
      ) {
        endDiff++;
      }

      const removedText = previousText.slice(
        startDiff,
        previousText.length - endDiff,
      );
      const addedText = currentText.slice(
        startDiff,
        currentText.length - endDiff,
      );

      charsDiff = addedText.length - removedText.length;
    }
  }

  return {
    charsDiff,
    oldText: previousText,
    newText: currentText,
    oldCaretPosition: caretPosition - charsDiff,
    caretPosition,
  };
};

export const dispatchTextContentChangingEvent = (textareaRef, previousText) => {
  const changes = calculateTextChanges(textareaRef, previousText);
  emitCustomEvent(EVENTS.TEXT_CONTENT_CHANGING, changes);

  return changes;
};

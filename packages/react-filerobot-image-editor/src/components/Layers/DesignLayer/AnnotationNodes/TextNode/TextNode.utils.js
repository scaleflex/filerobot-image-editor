/* eslint-disable no-plusplus */
/** Internal dependencies */
import { TEXT_EDITOR_ID } from 'utils/constants';
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

export const createTextChangeTracker = () => {
  let previousText = '';
  let previousSelection = null;

  return {
    trackChange: (currentText) => {
      const selection = window.getSelection();
      let caretPosition = 0;

      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const textareaElement = document.getElementById(TEXT_EDITOR_ID);

        if (textareaElement) {
          // Create a new range from the start of the element to the caret position
          const measureRange = document.createRange();
          measureRange.setStart(textareaElement, 0);
          measureRange.setEnd(range.startContainer, range.startOffset);

          // Get the text content of this range, which gives us all text up to the caret
          const textUpToCaret = measureRange.toString();
          caretPosition = textUpToCaret.length;
        } else {
          // Fallback: use the offset within the node
          caretPosition = range.startOffset;
        }
      }

      let diff = 0;
      let usedText = '';
      let removedText = '';
      let isReplacement = false;

      // Calculate the difference between previous and current text
      if (previousText !== currentText) {
        // Find the first differing character
        let i = 0;
        while (
          i < previousText.length &&
          i < currentText.length &&
          previousText[i] === currentText[i]
        ) {
          i++;
        }

        // Find the last differing character from the end
        let j = previousText.length - 1;
        let k = currentText.length - 1;
        while (j >= i && k >= i && previousText[j] === currentText[k]) {
          j--;
          k--;
        }

        // Check if there was a previous selection that suggests replacement
        if (previousSelection && previousSelection.length > 0) {
          // This is likely a replacement operation
          isReplacement = true;
          removedText = previousSelection;
          usedText = currentText.slice(i, k + 1);
          // Calculate net diff: new text length minus removed text length
          diff = usedText.length - removedText.length;
        } else {
          // Calculate diff: positive for addition, negative for removal
          diff = currentText.length - previousText.length;

          // Determine the used text (what was added or removed)
          if (diff > 0) {
            // Text was added
            usedText = currentText.slice(i, i + diff);
          } else if (diff < 0) {
            // Text was removed
            usedText = previousText.slice(i, i + Math.abs(diff));
          } else {
            // Text was replaced (equal length change)
            usedText = currentText.slice(i, k + 1);
          }
        }
      }

      // Store current selection state for next change detection
      if (selection.rangeCount > 0 && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        previousSelection = range.toString();
      } else {
        previousSelection = null;
      }

      // Update previous values
      previousText = currentText;

      return {
        diff,
        usedText,
        removedText: isReplacement ? removedText : '',
        isReplacement,
        caretPosition,
      };
    },

    // Reset function for when editing starts
    reset: (initialText = '') => {
      previousText = initialText;
    },
  };
};

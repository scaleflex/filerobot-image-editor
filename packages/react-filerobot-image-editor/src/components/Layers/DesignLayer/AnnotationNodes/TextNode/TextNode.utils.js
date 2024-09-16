/** Internal dependencies */
import { TEXT_EDITOR_ID } from 'utils/constants';
import rgbaToHexWithOpacity from 'utils/rgbaToHexa';
import toPrecisedFloat from 'utils/toPrecisedFloat';

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

export const cssStyleToJsCanvasProps = (
  cssTextStyle,
  originalSourceInitialScale = 1,
) => {
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
    jsStyles[preparedKey] = value?.toLowerCase().endsWith('px')
      ? parseFloat(value)
      : value;
  });

  if (jsStyles.color) {
    jsStyles.fill = jsStyles.color;
    delete jsStyles.color;
  }

  // transform is used only for baselineShift so we are using it safely till now.
  if (jsStyles.transform) {
    // - to reverse the current direction as baseline and transform are opposite directions for each other.
    jsStyles.baselineShift = toPrecisedFloat(
      -parseFloat(jsStyles.transform.match(/\((.*)px\)/)[1]) /
        originalSourceInitialScale,
      2,
    );
    delete jsStyles.transform;
  }

  if (jsStyles.letterSpacing) {
    jsStyles.letterSpacing = toPrecisedFloat(
      parseFloat(jsStyles.letterSpacing) / originalSourceInitialScale,
      2,
    );
  }

  return jsStyles;
};

export const getNewFormattedContent = (selectedContent, newFormats) => {
  const newContent = [];

  Array.from(selectedContent.childNodes).forEach((node, i) => {
    const nodeTextContent = node.textContent;
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
        parentNode.textContent === node.textContent &&
        parentNode?.style &&
        parentNode.nodeName !== 'MARK';
      newNode =
        (isSameTextAndHasStylableParent && parentNode) ||
        document.createElement('span');

      if (!isSameTextAndHasStylableParent) {
        newNode.innerText = nodeTextContent;
      }
    }
    Object.assign(newNode.style, newFormats);

    if (
      i > 0 &&
      nodeTextContent &&
      newNode.style.cssText === newContent[i - 1]?.style.cssText
    ) {
      newContent[i - 1].textContent = `${
        newContent[i - 1].textContent
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
  { originalSourceInitialScale = 1 } = {},
) => {
  if (node.nodeName === '#text' && node.textContent) {
    const lastNode = flattenedContent[flattenedContent.length - 1];
    const startIndex = (lastNode?.endIndex || -1) + 1;

    if (
      lastNode &&
      !lastNode.textContent.startsWith('$') &&
      !node.textContent.startsWith('$') && // if variable keep it separate.
      JSON.stringify(wrapperStyles) === JSON.stringify(lastNode.style)
    ) {
      lastNode.textContent = `${lastNode.textContent}${node.textContent}`;
      lastNode.endIndex = lastNode.startIndex + lastNode.textContent.length - 1;
    } else {
      const endIndex = startIndex + node.textContent.length - 1;
      flattenedContent.push({
        style: wrapperStyles,
        textContent: node.textContent,
        startIndex,
        endIndex,
      });
    }

    const markElement =
      (node.parentNode.nodeName === 'MARK' && node.parentNode) ||
      (node.parentNode.parentNode?.nodeName === 'MARK' &&
        node.parentNode.parentNode);
    if (markElement) {
      if (markElement.textContent.startsWith(node.textContent)) {
        // eslint-disable-next-line no-param-reassign
        markElement.dataset.startIndex = startIndex;
      }

      if (markElement.textContent.endsWith(node.textContent)) {
        // eslint-disable-next-line no-param-reassign
        markElement.dataset.endIndex =
          (parseInt(markElement.dataset.startIndex, 10) || 0) +
          markElement.textContent.length -
          1;
      }
    }

    return;
  }

  const wrapperNodeStyle = cssStyleToJsCanvasProps(
    node.style.cssText,
    originalSourceInitialScale,
  );
  node.childNodes.forEach((currentNode) => {
    if (!currentNode.textContent) {
      return;
    }

    pushNodeFlattenedContent(
      flattenedContent,
      currentNode,
      {
        ...wrapperStyles,
        ...wrapperNodeStyle,
      },
      { originalSourceInitialScale },
    );
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

export const getCurrentSelectedNodeStyles = (
  node,
  currentStyles = {},
  { originalSourceInitialScale } = {},
) => {
  if (!node) {
    return currentStyles;
  }

  const newStyles = {
    ...(node.style &&
      cssStyleToJsCanvasProps(node.style.cssText, originalSourceInitialScale)),
    ...currentStyles,
  };

  if (node.id === TEXT_EDITOR_ID || node.contentEditable === 'true') {
    if (newStyles.fill) {
      newStyles.fill = `#${rgbaToHexWithOpacity(newStyles.fill).hex}`;
    }
    return newStyles;
  }

  return getCurrentSelectedNodeStyles(node.parentNode, newStyles, {
    originalSourceInitialScale,
  });
};

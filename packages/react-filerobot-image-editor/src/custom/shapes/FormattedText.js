/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/** External dependencies */
import { Factory } from 'konva/lib/Factory';
import { _registerNode } from 'konva/lib/Global';
import { Shape } from 'konva/lib/Shape';
import { Util } from 'konva/lib/Util';
import {
  getNumberOrAutoValidator,
  getNumberValidator,
  getBooleanValidator,
} from 'konva/lib/Validators';

let dummyContext;
function getDummyContext() {
  if (dummyContext) {
    return dummyContext;
  }
  dummyContext = Util.createCanvasElement().getContext('2d');
  return dummyContext;
}

function normalizeFontFamily(fontFamily) {
  return fontFamily
    ? fontFamily
        .split(',')
        .map((family) => {
          family = family.trim();
          const hasSpace = family.indexOf(' ') >= 0;
          const hasQuotes =
            family.indexOf('"') >= 0 || family.indexOf("'") >= 0;
          if (hasSpace && !hasQuotes) {
            family = `"${family}"`;
          }
          return family;
        })
        .join(', ')
    : '';
}

const NORMAL = 'normal';
const CHANGEABLE_ATTRS = [
  'padding',
  'wrap',
  'lineHeight',
  'letterSpacing',
  'width',
  'height',
  'text',
  'fontSize',
  'fill',
  'fontWeight',
  'fontStyle',
  'fontFamily',
  'verticalAlign',
  'scaleFormatDimensionsBy',
];

export class FormattedText extends Shape {
  constructor(config) {
    super(config);
    // update text data for certain attr changes
    CHANGEABLE_ATTRS.forEach((attr) => {
      this.on(`${attr}Change.konva`, this.computeTextParts);
    });
    this.computeTextParts();
  }

  formatFont(part) {
    const defaultFormat = this.getDefaultTextPartFormat();
    return `${part.style.fontStyle || defaultFormat.fontStyle} ${
      part.style.fontWeight || defaultFormat.fontWeight
    } ${part.style.fontVariant || defaultFormat.fontVariant} ${
      part.style.fontSize ?? defaultFormat.fontSize
    }px ${normalizeFontFamily(
      part.style.fontFamily || defaultFormat.fontFamily,
    )}`;
  }

  measurePart(part) {
    const context = getDummyContext();
    const partLetterSpacing = part.style.letterSpacing || 0;

    context.save();
    context.font = this.formatFont(part);
    context.letterSpacing = `${partLetterSpacing}px`;
    const { width } = context.measureText(part.text);
    context.restore();
    return width;
  }

  getDefaultTextPartFormat() {
    return {
      fontSize: this.fontSize(),
      fill: this.fill(),
      fontWeight: this.fontWeight(),
      fontStyle: this.fontStyle(),
      baselineShift: 0,
      letterSpacing: this.letterSpacing(),
      fontVariant: this.fontVariant(),
      fontFamily: this.fontFamily(),
    };
  }

  computeTextParts() {
    this.textLines = [];
    this.visibleLinesStartIndex = 0;
    const textStr = Array.isArray(this.text())
      ? this.text()
          .map(({ textContent } = {}) => textContent)
          .join('')
      : this.text();
    const lines = textStr.split('\n');
    const maxWidth = this.attrs.width;
    const maxHeight = this.attrs.height;
    const hasFixedWidth = maxWidth !== 'auto' && maxWidth !== undefined;
    const hasFixedHeightWithoutAlign =
      maxHeight !== 'auto' && maxHeight !== undefined;
    const hasFixedHeight =
      hasFixedHeightWithoutAlign && this.verticalAlign() === 'top';

    const shouldWrap = this.wrap() !== 'none';
    const wrapAtWord = this.wrap() !== 'char' && shouldWrap;
    const shouldAddEllipsis = this.ellipsis();
    const ellipsis = '…';
    const defaultFormat = this.getDefaultTextPartFormat();
    const additionalWidth = shouldAddEllipsis
      ? this.measurePart({
          text: ellipsis,
          style: {
            ...defaultFormat,
            ...(Array.isArray(this.text()) && this.text().slice(-1)?.style),
          },
        })
      : 0;

    const findParts = (start, end) => {
      return Array.isArray(this.text()) && this.text().length > 0
        ? this.text()
            .filter(
              ({ startIndex = 0, endIndex = Infinity } = {}) =>
                (start >= startIndex && start <= endIndex) ||
                (end >= startIndex && end <= endIndex) ||
                (startIndex >= start && endIndex <= end),
            )
            .map(({ textContent, style = {}, startIndex = 0 } = {}) => ({
              style: {
                ...defaultFormat,
                ...style,
              },
              width: 0,
              text: textContent
                // Remove the new line as it is not needed in the content anymore
                .replaceAll('\n', '')
                .substring(start - startIndex, end - startIndex),
            }))
        : [
            {
              text: textStr.replaceAll('\n', '').slice(start, end),
              style: defaultFormat,
              width: 0,
            },
          ];
    };
    const measureParts = (parts) => {
      return parts.reduce((size, part) => {
        part.width = this.measurePart(part);
        return size + part.width;
      }, 0);
    };
    const measureSubstring = (start, end) => {
      return measureParts(findParts(start, end));
    };
    const measureHeightParts = (parts) => {
      return Math.max(
        ...parts.map((part) => {
          return (part.style.fontSize ?? this.fontSize) * this.lineHeight();
        }),
      );
    };

    let currentHeight = 0;
    let charCount = 0;

    const addLine = (width, height, parts) => {
      // if element height is fixed, abort if adding one more line would overflow
      // so we don't add this line, the loop will be broken anyway
      if (hasFixedHeightWithoutAlign && currentHeight + height > maxHeight) {
        if (this.verticalAlign() === 'top') {
          return;
        }

        this.visibleLinesStartIndex += 1;
      }

      this.textLines.push({
        width,
        parts: parts.map((part, i) => {
          // remove only 1 space from the beginning of the line if found (as it is not needed if line broken as a new one).
          part.text = i === 0 ? part.text.replace(/^\s{1}/, '') : part.text;
          // compute size if not already computed during part creation
          part.width = part.width === 0 ? this.measurePart(part) : part.width;
          return part;
        }),
        totalHeight: height,
      });
    };

    const linesLength = lines.length;
    for (let i = 0; i < linesLength; i += 1) {
      const currentLine = lines[i];
      let line = currentLine;
      let lineWidth = measureSubstring(charCount, charCount + line.length);
      let lineHeight;

      if (hasFixedWidth && lineWidth > maxWidth) {
        /*
         * if width is fixed and line does not fit entirely
         * break the line into multiple fitting lines
         */
        let cursor = 0;
        while (line.length > 0) {
          /*
           * use binary search to find the longest substring that
           * that would fit in the specified width
           */
          let low = 0;
          let high = line.length;
          let match = '';
          let matchWidth = 0;
          while (low < high) {
            // eslint-disable-next-line no-bitwise
            const mid = (low + high) >>> 1;
            const substr = line.slice(0, mid + 1);
            const substrWidth =
              measureSubstring(
                charCount + cursor,
                charCount + cursor + mid + 1,
              ) + additionalWidth;
            if (substrWidth <= maxWidth) {
              low = mid + 1;
              match = substr;
              matchWidth = substrWidth;
            } else {
              high = mid;
            }
          }
          /*
           * 'low' is now the index of the substring end
           * 'match' is the substring
           * 'matchWidth' is the substring width in px
           */
          if (match) {
            // a fitting substring was found
            if (wrapAtWord) {
              // try to find a space or dash where wrapping could be done
              // TODO: IMPROVE THE WORD WRAPPING TO BE WORD?
              let wrapIndex;
              const nextChar = line[match.length];
              const nextIsSpaceOrDash = nextChar === ' ' || nextChar === '-';
              if (nextIsSpaceOrDash && matchWidth <= maxWidth) {
                wrapIndex = match.length;
              } else {
                wrapIndex =
                  Math.max(match.lastIndexOf(' '), match.lastIndexOf('-')) + 1;
              }
              if (wrapIndex > 0) {
                // re-cut the substring found at the space/dash position
                low = wrapIndex;
                match = match.slice(0, low);
                matchWidth = measureSubstring(
                  charCount + cursor,
                  charCount + cursor + low,
                );
              }
            }
            const parts = findParts(
              charCount + cursor,
              charCount + cursor + low,
            ).filter((part) => part.text);
            lineHeight = measureHeightParts(parts);
            addLine(measureParts(parts), lineHeight, parts);
            currentHeight += lineHeight;
            if (
              !shouldWrap ||
              (hasFixedHeight && currentHeight + lineHeight > maxHeight)
            ) {
              const lastLine = this.textLines[this.textLines.length - 1];
              if (lastLine) {
                if (shouldAddEllipsis) {
                  const lastPart = lastLine.parts[lastLine.parts.length - 1];
                  const lastPartWidthWithEllipsis = this.measurePart({
                    ...lastPart,
                    text: `${lastPart.text}${ellipsis}`,
                  });
                  const haveSpace = lastPartWidthWithEllipsis < maxWidth;
                  if (!haveSpace) {
                    lastPart.text = lastPart.text.slice(
                      0,
                      lastPart.text.length - 3,
                    );
                  }
                  lastLine.parts.splice(lastLine.parts.length - 1, 1);
                  lastLine.parts.push({
                    ...lastPart,
                    width: lastPartWidthWithEllipsis,
                    text: `${lastPart.text}${ellipsis}`,
                  });
                }
              }

              /*
               * stop wrapping if wrapping is disabled or if adding
               * one more line would overflow the fixed height
               */
              break;
            }
            line = line.slice(low);
            cursor += low;
            if (line.length > 0) {
              // Check if the remaining text would fit on one line
              const foundParts = findParts(
                charCount + cursor,
                charCount + cursor + line.length,
              );
              lineWidth = measureParts(foundParts);
              if (lineWidth <= maxWidth && foundParts) {
                // if it does, add the line and break out of the loop
                const height = measureHeightParts(foundParts);
                addLine(lineWidth, height, foundParts);
                currentHeight += height;
                break;
              }
            }
          } else {
            // not even one character could fit in the element, abort
            break;
          }
        }
      } else {
        const parts = findParts(charCount, charCount + line.length);
        lineHeight = measureHeightParts(parts);
        addLine(lineWidth, lineHeight, parts);
      }

      // if element height is fixed, abort if adding one more line would overflow
      // so we stop here to avoid processing useless lines
      if (hasFixedHeight && currentHeight + lineHeight > maxHeight) {
        break;
      }

      charCount += currentLine.length;
      currentHeight += lineHeight;
    }

    const isMiddleAligned = this.verticalAlign() === 'middle';
    const startIndex = isMiddleAligned
      ? this.visibleLinesStartIndex / 2
      : this.visibleLinesStartIndex;
    this.linesHeight = this.textLines
      .slice(
        Math.floor(startIndex),
        isMiddleAligned
          ? this.textLines.length - Math.ceil(startIndex)
          : undefined,
      )
      .reduce((size, line) => size + line.totalHeight, 0);
    this.linesWidth = Math.max(...this.textLines.map((line) => line.width, 0));
  }

  getHeight() {
    const isAuto =
      this.attrs.height === 'auto' || this.attrs.height === undefined;
    if (!isAuto) {
      return this.attrs.height;
    }
    return this.linesHeight + this.padding() * 2;
  }

  getWidth() {
    const isAuto =
      this.attrs.width === 'auto' || this.attrs.width === undefined;
    if (!isAuto) {
      return this.attrs.width;
    }
    return this.linesWidth + this.padding() * 2;
  }

  /**
   * @description This method is called when the shape should render
   * on canvas
   */
  _sceneFunc(context) {
    if (this.text().length === 0 || this.textLines?.length === 0) {
      return;
    }

    const totalWidth = this.getWidth();
    const totalHeight = this.getHeight();

    context.setAttr('textBaseline', 'alphabetic');
    context.setAttr('textAlign', 'left');

    // handle vertical alignment
    const isMiddleAligned = this.verticalAlign() === 'middle';
    const padding = this.padding();
    let alignY = 0;
    if (isMiddleAligned) {
      alignY =
        (totalHeight -
          this.textLines[0].totalHeight / 2 -
          this.linesHeight -
          padding * 2) /
        2;
    } else if (this.verticalAlign() === 'bottom') {
      alignY = totalHeight - this.linesHeight - padding * 2;
    }
    context.translate(padding, alignY + padding);

    const startIndex = isMiddleAligned
      ? this.visibleLinesStartIndex / 2
      : this.visibleLinesStartIndex;
    const visibleLines = this.textLines.slice(
      Math.floor(startIndex),
      isMiddleAligned
        ? this.textLines.length - Math.ceil(startIndex)
        : undefined,
    );
    let y = this.textLines[0].totalHeight;
    let lineIndex = 0;
    visibleLines.forEach((line) => {
      const isLastLine = lineIndex === visibleLines.length - 1;
      let lineX = 0;
      context.save();

      // horizontal alignment
      if (this.align() === 'right') {
        lineX += totalWidth - line.width - padding * 2;
      } else if (this.align() === 'center') {
        lineX += (totalWidth - line.width - padding * 2) / 2;
      }

      line.parts.forEach((part) => {
        // style
        if (part.style.textDecoration?.includes('underline')) {
          context.save();
          context.beginPath();

          context.moveTo(
            lineX,
            y + Math.round(part.style.fontSize / 2) - part.style.baselineShift,
          );
          const spacesNumber = part.text.split(' ').length - 1;
          const oneWord = spacesNumber === 0;
          const lineWidth =
            this.align() === 'justify' && isLastLine && !oneWord
              ? totalWidth - padding * 2
              : part.width;
          context.lineTo(
            lineX + Math.round(lineWidth),
            y + Math.round(part.style.fontSize / 2) - part.style.baselineShift,
          );

          // I have no idea what is real ratio
          // just /15 looks good enough
          context.lineWidth = part.style.fontSize / 15;
          context.strokeStyle = part.style.fill;
          context.stroke();
          context.restore();
        }
        if (part.style.textDecoration?.includes('line-through')) {
          context.save();
          context.beginPath();
          context.moveTo(lineX, y - part.style.baselineShift);
          const spacesNumber = part.text.split(' ').length - 1;
          const oneWord = spacesNumber === 0;
          const lineWidth =
            this.align() === 'justify' && isLastLine && !oneWord
              ? totalWidth - padding * 2
              : part.width;
          context.lineTo(
            lineX + Math.round(lineWidth),
            y - part.style.baselineShift,
          );
          context.lineWidth = part.style.fontSize / 15;
          context.strokeStyle = part.style.fill;
          context.stroke();
          context.restore();
        }

        this.fill(part.style.fill);
        context.setAttr('font', this.formatFont(part));

        // text
        if (part.style.letterSpacing !== 0 || this.align() === 'justify') {
          const spacesNumber = part.text.split(' ').length - 1;
          const array = Array.from(part.text);
          for (let li = 0; li < array.length; li += 1) {
            const textSlice = array[li];
            // skip justify for the last line
            if (
              textSlice === ' ' &&
              lineIndex !== visibleLines.length - 1 &&
              this.align() === 'justify'
            ) {
              lineX += (totalWidth - padding * 2 - line.width) / spacesNumber;
            }
            this.drawState = {
              x: lineX,
              y: y - part.style.baselineShift,
              text: textSlice,
            };
            context.fillStrokeShape(this);
            lineX += this.measurePart({ ...part, text: textSlice });
          }
        } else {
          this.drawState = {
            x: lineX,
            y: y - part.style.baselineShift,
            text: part.text,
          };
          context.fillStrokeShape(this);
          lineX += part.width;
        }
      });

      context.restore();
      if (typeof visibleLines[lineIndex + 1] !== 'undefined') {
        y += visibleLines[lineIndex + 1].totalHeight;
      }
      lineIndex += 1;
    });
  }

  /**
   * @description This method is called by context.fillStrokeShape(this)
   * to fill the shape
   */
  _fillFunc(context) {
    context.fillText(this.drawState.text, this.drawState.x, this.drawState.y);
  }

  /**
   * @description This method is called by context.fillStrokeShape(this)
   * to stroke the shape
   */
  _strokeFunc(context) {
    context.strokeText(
      this.drawState.text,
      this.drawState.x,
      this.drawState.y,
      undefined,
    );
  }

  /**
   * @description This method should render on canvas a rect with
   * the width and the height of the text shape
   */
  _hitFunc(context) {
    context.beginPath();
    context.rect(0, 0, this.getWidth(), this.getHeight());
    context.closePath();
    context.fillStrokeShape(this);
  }

  // for text we can't disable stroke scaling
  // if we do, the result will be unexpected
  // eslint-disable-next-line class-methods-use-this
  getStrokeScaleEnabled() {
    return true;
  }
}

FormattedText.prototype.className = 'FormattedText';
_registerNode(FormattedText);

/**
 * get/set width of text area, which includes padding.
 * @name Konva.Text#width
 * @method
 * @param {Number} width
 * @returns {Number}
 * @example
 * // get width
 * var width = text.width();
 *
 * // set width
 * text.width(20);
 *
 * // set to auto
 * text.width('auto');
 * text.width() // will return calculated width, and not "auto"
 */
Factory.overWriteSetter(FormattedText, 'width', getNumberOrAutoValidator());

/**
 * get/set the height of the text area, which takes into account multi-line text, line heights, and padding.
 * @name Konva.Text#height
 * @method
 * @param {Number} height
 * @returns {Number}
 * @example
 * // get height
 * var height = text.height();
 *
 * // set height
 * text.height(20);
 *
 * // set to auto
 * text.height('auto');
 * text.height() // will return calculated height, and not "auto"
 */
Factory.overWriteSetter(FormattedText, 'height', getNumberOrAutoValidator());

/**
 * get/set padding
 * @name Konva.Text#padding
 * @method
 * @param {Number} padding
 * @returns {Number}
 * @example
 * // get padding
 * var padding = text.padding();
 *
 * // set padding to 10 pixels
 * text.padding(10);
 */
Factory.addGetterSetter(FormattedText, 'padding', 0, getNumberValidator());

/**
 * get/set horizontal align of text.  Can be 'left', 'center', 'right' or 'justify'
 * @name Konva.Text#align
 * @method
 * @param {String} align
 * @returns {String}
 * @example
 * // get text align
 * var align = text.align();
 *
 * // center text
 * text.align('center');
 *
 * // align text to right
 * text.align('right');
 */
Factory.addGetterSetter(FormattedText, 'align', 'left');

/**
 * get/set vertical align of text.  Can be 'top', 'middle', 'bottom'.
 * @name Konva.Text#verticalAlign
 * @method
 * @param {String} verticalAlign
 * @returns {String}
 * @example
 * // get text vertical align
 * var verticalAlign = text.verticalAlign();
 *
 * // center text
 * text.verticalAlign('middle');
 */
Factory.addGetterSetter(FormattedText, 'verticalAlign', 'top');

/**
 * get/set line height.  The default is 1.
 * @name Konva.Text#lineHeight
 * @method
 * @param {Number} lineHeight
 * @returns {Number}
 * @example
 * // get line height
 * var lineHeight = text.lineHeight();
 *
 * // set the line height
 * text.lineHeight(2);
 */
Factory.addGetterSetter(FormattedText, 'lineHeight', 1, getNumberValidator());

/**
 * get/set wrap.  Can be "word", "char", or "none". Default is "word".
 * In "word" wrapping any word still can be wrapped if it can't be placed in the required width
 * without breaks.
 * @name Konva.Text#wrap
 * @method
 * @param {String} wrap
 * @returns {String}
 * @example
 * // get wrap
 * var wrap = text.wrap();
 *
 * // set wrap
 * text.wrap('word');
 */
Factory.addGetterSetter(FormattedText, 'wrap', 'word');

/**
 * get/set ellipsis. Can be true or false. Default is false. If ellipses is true,
 * Konva will add "..." at the end of the text if it doesn't have enough space to write characters.
 * That is possible only when you limit both width and height of the text
 * @name Konva.Text#ellipsis
 * @method
 * @param {Boolean} ellipsis
 * @returns {Boolean}
 * @example
 * // get ellipsis param, returns true or false
 * var ellipsis = text.ellipsis();
 *
 * // set ellipsis
 * text.ellipsis(true);
 */
Factory.addGetterSetter(
  FormattedText,
  'ellipsis',
  false,
  getBooleanValidator(),
);

/**
 * set letter spacing property. Default value is 0.
 * @name Konva.Text#letterSpacing
 * @method
 * @param {Number} letterSpacing
 */
Factory.addGetterSetter(
  FormattedText,
  'letterSpacing',
  0,
  getNumberValidator(),
);

/**
 * get/set text
 * @name Konva.Text#text
 * @method
 * @param {String} text
 * @returns {String}
 * @example
 * // get text
 * var text = text.text();
 *
 * // set text
 * text.text('Hello world!');
 * or
 * text.text([{ textContent: 'Hello there', style: { fontSize: 24, fill: 'green' }, startIndex: 0 }])
 */
Factory.addGetterSetter(FormattedText, 'text');

/**
 * get/set font family
 * @name Konva.Text#fontFamily
 * @method
 * @param {String} fontFamily
 * @returns {String}
 * @example
 * // get font family
 * var fontFamily = text.fontFamily();
 *
 * // set font family
 * text.fontFamily('Arial');
 */
Factory.addGetterSetter(FormattedText, 'fontFamily', 'Arial');

/**
 * get/set font size in pixels
 * @name Konva.Text#fontSize
 * @method
 * @param {Number} fontSize
 * @returns {Number}
 * @example
 * // get font size
 * var fontSize = text.fontSize();
 *
 * // set font size to 22px
 * text.fontSize(22);
 */
Factory.addGetterSetter(FormattedText, 'fontSize', 16, getNumberValidator());

/**
 * get/set font variant.  Can be 'normal' or 'small-caps'.  'normal' is the default.
 * @name Konva.Text#fontVariant
 * @method
 * @param {String} fontVariant
 * @returns {String}
 * @example
 * // get font variant
 * var fontVariant = text.fontVariant();
 *
 * // set font variant
 * text.fontVariant('small-caps');
 */

Factory.addGetterSetter(FormattedText, 'fontVariant', NORMAL);

/**
 * get/set font style.  Can be 'normal', 'italic', or 'bold', '500' or even 'italic bold'.  'normal' is the default.
 * @name Konva.Text#fontStyle
 * @method
 * @param {String} fontStyle
 * @returns {String}
 * @example
 * // get font style
 * var fontStyle = text.fontStyle();
 *
 * // set font style
 * text.fontStyle('italic');
 */

Factory.addGetterSetter(FormattedText, 'fontStyle', NORMAL);

/**
 * get/set font style.  Can be 'normal', 'italic', or 'bold', '500' or even 'italic bold'.  'normal' is the default.
 * @name Konva.Text#fontStyle
 * @method
 * @param {String} fontStyle
 * @returns {String}
 * @example
 * // get font style
 * var fontWeight = text.fontWeight();
 *
 * // set font style
 * text.fontWeight('bold');
 */

Factory.addGetterSetter(FormattedText, 'fontWeight', NORMAL);

/**
 * get/set scaleFormatDimensionsBy, used to scale the format dimensions (ex. letterSpacing, baselineShift).
 * @name Konva.Text#fontStyle
 * @method
 * @param {String} fontStyle
 * @returns {String}
 * @example
 * // get font style
 * var fontWeight = text.fontWeight();
 *
 * // set font style
 * text.fontWeight('bold');
 */

Factory.addGetterSetter(FormattedText, 'scaleFormatDimensionsBy', 1);

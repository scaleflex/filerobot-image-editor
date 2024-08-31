/** External Dependencies */
import styled from 'styled-components';

const StyledTextNodeContentTextarea = styled.textarea(
  ({
    fill,
    opacity,
    fontFamily,
    fontSize,
    fontStyle,
    letterSpacing,
    lineHeight,
    textAlign,
    width,
    height,
  }) => `
  background: transparent;
  color: ${fill};
  opacity: ${opacity};
  font-family: "${fontFamily}";
  font-size: ${fontSize}px;
  font-weight: ${fontStyle?.includes('bold') ? 'bold' : 'normal'};
  font-style: ${fontStyle?.includes('italic') ? 'italic' : 'normal'};
  letter-spacing: ${letterSpacing}px;
  line-height: ${lineHeight};
  text-align: ${textAlign};
  width: ${width}px;
  height: ${height}px;
  border: none;
  outline: 3px solid #000;
  border-radius: 2px;
  resize: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
`,
);

export { StyledTextNodeContentTextarea };

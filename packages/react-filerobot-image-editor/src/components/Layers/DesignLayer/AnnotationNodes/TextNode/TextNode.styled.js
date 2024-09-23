/** External Dependencies */
import styled from 'styled-components';

const StyledTextNodeContentTextarea = styled.div(
  ({ $opacity, $textAlign, $width, $height }) => `
  background: transparent;
  opacity: ${$opacity};
  text-align: ${$textAlign};
  width: ${$width}px;
  height: ${$height}px;
  border: none;
  outline: 3px solid #000;
  border-radius: 2px;
  resize: none;
  padding: 0;
  margin: 0;
  overflow: visible auto;
  cursor: text;
  overflow-wrap: break-word;
  word-break: normal;
  user-select: text;

  mark, mark * {
    background: rgba(40, 90, 195, 0.75) !important;
    color: #fff !important;
    font-family: inherit;
  }
`,
);

export { StyledTextNodeContentTextarea };

/** External Dependencies */
import styled from 'styled-components';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';

const getVerticalAlignStyle = (verticalAlign) => {
  if (verticalAlign === 'middle') {
    return `
      display: flex;
      align-items: center;
    `;
  }

  if (verticalAlign === 'bottom') {
    return `
      display: flex;
      align-items: flex-end;
    `;
  }

  return '';
};

const StyledTextNodeContentTextarea = styled.div(
  ({ $opacity, $textAlign, $verticalAlign, $width, $height, theme }) => `
      background: transparent;
      opacity: ${$opacity};
      text-align: ${$textAlign};
      width: ${$width}px;
      height: ${$height}px;
      border: none;
      outline: 3px solid ${theme?.palette?.[PC.AccentPrimary]};
      border-radius: 2px;
      resize: none;
      padding: 0;
      margin: 0;
      overflow: visible auto;
      cursor: text;
      overflow-wrap: break-word;
      word-break: normal;
      user-select: text;
      ${getVerticalAlignStyle($verticalAlign)}

      mark, mark * {
        background: ${theme?.palette?.[PC.AccentPrimary]} !important;
        color: #fff !important;
      }
    `,
);

export { StyledTextNodeContentTextarea };

/** External Dependencies */
import Label from '@scaleflex/ui/core/label';
import { FontVariant as FV } from '@scaleflex/ui/utils/types/typography';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';
import { Stage } from 'react-konva';
import styled, { css } from 'styled-components';

const StyledFilterItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 2px;
  gap: 6px;
  cursor: pointer;
  border-radius: 2px;

  canvas {
    border-radius: 2px;
  }
`;

const FilterItemPreview = styled(Stage)`
  [aria-selected='true'] & {
    padding: 1px;
    border: 1px solid ${({ theme }) => theme.palette['accent-primary-active']};
    border-radius: 2px;
  }
`;

const FilterItemLabel = styled(Label)(
  ({ theme }) => css`
    color: ${theme.palette[PC.TextPrimary]};
    ${theme.typography.font[FV.LabelExtraSmallUp]};

    [aria-selected='true'] & {
      color: ${theme.palette['accent-primary-active']};
    }
  `,
);

export { StyledFilterItem, FilterItemPreview, FilterItemLabel };

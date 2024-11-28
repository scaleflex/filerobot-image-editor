/** External Dependencies */
import styled, { css } from 'styled-components';
import IconButton from '@scaleflex/ui/core/icon-button';
import InputGroup from '@scaleflex/ui/core/input-group';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';
import { FontVariant as FV } from '@scaleflex/ui/utils/types/typography';

const StyledResizeWrapper = styled.div`
  display: flex;
  justify-content: ${({ alignment }) => alignment || 'center'};
  align-items: flex-end;
  gap: 3px;
  flex-wrap: wrap;
`;

const StyledResizeInput = styled(InputGroup)(
  ({ theme }) => css`
    width: 106px;
    max-width: 106px;
    margin-top: 4px;

    .SfxInput-Base {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    }

    span {
      color: ${theme.palette[PC.TextSecondary]};
      ${theme.typography.font[FV.LabelMedium]};
    }
  `,
);

const StyledRatioLockIcon = styled(IconButton)`
  svg {
    margin-bottom: 1px;
  }
`;

const StyledResetButton = styled(IconButton)`
  margin-left: 12px;
`;

export {
  StyledResizeWrapper,
  StyledResizeInput,
  StyledRatioLockIcon,
  StyledResetButton,
};

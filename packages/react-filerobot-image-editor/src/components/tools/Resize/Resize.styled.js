/** External Dependencies */
import styled, { css } from 'styled-components';
import IconButton from '@scaleflex/ui/core/icon-button';
import Input from '@scaleflex/ui/core/input';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';
import { FontVariant as FV } from '@scaleflex/ui/utils/types/typography';

const StyledResizeWrapper = styled.div`
  display: flex;
  justify-content: ${({ alignment }) => alignment || 'center'};
  align-items: center;
  gap: 12px;
  flex-wrap: ${({ disableWrap }) => (disableWrap ? 'no-wrap' : 'wrap')};
`;

const StyledResizeInput = styled(Input)(
  ({ theme }) => css`
    width: ${({ disableWrap }) => (disableWrap ? '100%' : '70px')};
    margin-top: '4px';

    span {
      color: ${theme.palette[PC.TextSecondary]};
      ${theme.typography.font[FV.LabelMedium]};
    }
  `,
);

const StyledRatioLockIcon = styled(IconButton)``;

export { StyledResizeWrapper, StyledResizeInput, StyledRatioLockIcon };

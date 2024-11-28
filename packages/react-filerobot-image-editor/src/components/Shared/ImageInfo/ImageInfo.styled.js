/** External dependencies */
import styled from 'styled-components';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';
import { FontVariant as FV } from '@scaleflex/ui/utils/types/typography';
import IconButton from '@scaleflex/ui/core/icon-button';
import Label from '@scaleflex/ui/core/label';

const StyledSmallButton = styled(IconButton)`
  padding: 8px;

  svg {
    color: ${({ theme: { palette }, showBackButton }) =>
      showBackButton ? palette[PC.IconsPrimary] : palette[PC.IconsMuted]};
  }
`;

const StyledImageOptionsButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: ${({ isPhoneScreen }) =>
    isPhoneScreen ? 'space-between' : 'center'};
`;

const StyledDimensionsLabel = styled(Label)`
  flex-shrink: 0;
  color: ${({ theme: { palette } }) => palette[PC.TextPlaceholder]};
  ${({ theme: { typography } }) => typography.font[FV.LabelMedium]};
`;

const StyledDimensionsButtons = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export {
  StyledImageOptionsButtons,
  StyledDimensionsLabel,
  StyledDimensionsButtons,
  StyledSmallButton,
};

/** External dependencies */
import styled from 'styled-components';
import IconButton from '@scaleflex/ui/core/icon-button';
import Label from '@scaleflex/ui/core/label';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';
import { FontVariant as FV } from '@scaleflex/ui/utils/types/typography';

const StyledSmallButton = styled(IconButton)`
  padding: 8px;

  svg {
    color: ${({ theme: { palette }, showBackButton }) =>
      showBackButton ? palette[PC.IconsPrimary] : palette[PC.IconsMuted]};
  }
`;

const StyledZoomPercentageLabel = styled(Label)`
  cursor: pointer;
  color: ${({ theme: { palette } }) => palette[PC.TextPrimary]};
  ${({ theme: { typography } }) => typography.font[FV.InputMd]};
`;

const StyledZoomingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export { StyledSmallButton, StyledZoomPercentageLabel, StyledZoomingWrapper };

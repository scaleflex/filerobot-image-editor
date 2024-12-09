/** External Dependencies */
import { Loading } from '@scaleflex/icons';
import styled, { keyframes } from 'styled-components';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';
import { FontVariant as FV } from '@scaleflex/ui/utils/types/typography';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const StyledSpinnerContainer = styled.div`
  background: ${({ theme: { palette } }) => palette[PC.BackgroundStateless]};
  display: flex;
  align-items: center;
  justify-content: center;
  position: ${({ showInline }) => (showInline ? 'relative' : 'absolute')};
  z-index: 11111;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  flex-direction: column;
  user-select: none;
`;

const StyledSpinnerWrapper = styled.div`
  position: relative;
`;

const StyledSpinner = styled(Loading)`
  animation: ${spin} 1.2s infinite;
`;

const StyledSpinnerText = styled.div`
  ${({ theme: { typography } }) => typography.font[FV.LabelMediumEmphasis]};
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export {
  StyledSpinnerContainer,
  StyledSpinnerWrapper,
  StyledSpinner,
  StyledSpinnerText,
};

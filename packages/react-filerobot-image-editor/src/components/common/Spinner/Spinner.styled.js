/** External Dependencies */
import { Loading } from '@scaleflex/icons';
import styled, { keyframes } from 'styled-components';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const StyledSpinnerWrapper = styled.div`
  background: ${({ theme: { palette } }) => palette[PC.BackgroundStateless]};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 11111;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  flex-direction: column;
  user-select: none;
`;

const StyledSpinner = styled(Loading)`
  animation: ${spin} 1.2s infinite;
`;

export { StyledSpinnerWrapper, StyledSpinner };

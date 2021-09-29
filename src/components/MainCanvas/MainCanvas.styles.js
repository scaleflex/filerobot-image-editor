/** External Dependencies */
import styled from 'styled-components';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  // TODO: Un-comment the bg-primary as it would be used the final color, -active is just for testing as it's shown more.
  // background: ${({ theme }) => theme.palette['bg-primary']};
  background: ${({ theme }) => theme.palette['bg-primary-active']};
`;

export { CanvasContainer };

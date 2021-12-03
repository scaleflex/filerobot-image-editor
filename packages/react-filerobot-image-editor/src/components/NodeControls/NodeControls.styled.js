/** External Dependencies */
import styled from 'styled-components';

const StyledNodeControls = styled.div(
  ({ theme, top, left }) => `
  position: absolute;
  z-index: 1;
  background: ${theme.palette['bg-secondary']};
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 2px ${theme.palette['light-shadow']};
  top: ${(top || 0) + 8}px;
  left: ${(left || 0) + 4}px;
  transform: translateX(-50%);
  height: 32px;
`,
);

export { StyledNodeControls };

/** External Dependencies */
import styled from 'styled-components';

const StyledNodeControls = styled.div(
  ({ theme }) => `
  position: absolute;
  z-index: 1;
  background: ${theme.palette['bg-secondary']};
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 2px ${theme.palette['light-shadow']};
  transform: translate(-5%, -110%);
  transform-origin: center;
  height: 32px;
`,
);

export { StyledNodeControls };

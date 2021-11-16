/** External Dependencies */
import styled from 'styled-components';

const StyledPickerTrigger = styled.div`
  background-color: ${({ theme, color }) =>
    color || theme.palette['icons-primary']};
  border-radius: 2px;
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme }) => theme.palette['borders-strong']};
  cursor: pointer;
`;

export { StyledPickerTrigger };

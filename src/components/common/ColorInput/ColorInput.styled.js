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

const StyledPickerWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette['bg-secondary']};
  box-shadow: 0px 1px 2px rgba(78, 77, 77, 0.15);
  border-radius: 2px;
  padding: 12px;
  max-width: 300px;
`;

export { StyledPickerTrigger, StyledPickerWrapper };

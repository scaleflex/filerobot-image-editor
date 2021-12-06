/** External Dependencies */
import styled from 'styled-components';
import IconButton from '@scaleflex/ui/core/icon-button';
import Input from '@scaleflex/ui/core/input';

const StyledResizeWrapper = styled.div`
  display: flex;
  justify-content: ${({ alignLeft }) => (alignLeft ? 'left' : 'center')};
  align-items: center;
  flex-wrap: wrap;
`;

const StyledResizeInput = styled(Input)`
  width: 70px;
  height: 24px;
  margin: ${({ noLeftMargin }) => (noLeftMargin ? '8px 8px 8px 0' : '8px')};
`;

const StyledRatioLockIcon = styled(IconButton)`
  margin-right: 16px;
`;

export { StyledResizeWrapper, StyledResizeInput, StyledRatioLockIcon };

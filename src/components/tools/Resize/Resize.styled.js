/** External Dependencies */
import styled from 'styled-components';
import { IconButton, Input } from '@scaleflex/ui/core';

const StyledResizeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledResizeInput = styled(Input)`
  width: 70px;
  height: 24px;
  margin: 8px;
`;

const StyledRatioLockIcon = styled(IconButton)`
  margin-right: 16px;
`;

export { StyledResizeWrapper, StyledResizeInput, StyledRatioLockIcon };

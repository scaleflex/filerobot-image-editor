/** External Dependencies */
import styled from 'styled-components';
import Button from '@scaleflex/ui/core/button';
import IconButton from '@scaleflex/ui/core/icon-button';

const StyledButtonWrapper = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
  margin-right: 4px;
`;

const StyledMainButton = styled(Button)`
  height: 100%;
  padding: 4px 8px;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  ${({ keepBorderRadius }) =>
    keepBorderRadius
      ? ''
      : 'border-top-right-radius: 0; border-bottom-right-radius: 0'};

  span {
    font-size: 12px !important;
    line-height: 14px !important;
  }
`;

const StyledMenuButton = styled(IconButton)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: 1px;
  height: 100%;
  padding: 4px 8px;

  svg {
    transform: rotate(-90deg);
    width: 10px;
    margin-top: -4px;
  }
`;

export { StyledButtonWrapper, StyledMainButton, StyledMenuButton };

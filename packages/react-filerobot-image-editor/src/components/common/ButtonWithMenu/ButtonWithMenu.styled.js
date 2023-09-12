/** External Dependencies */
import styled from 'styled-components';
import Button from '@scaleflex/ui/core/button';
import IconButton from '@scaleflex/ui/core/icon-button';
import { Color as PC } from '@scaleflex/ui/utils/types/palette/color';
import { Menu } from '@scaleflex/ui/core';

const StyledButtonWrapper = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
  margin-right: 4px;
  flex-shrink: 0;
`;

const StyledMainButton = styled(Button)`
  flex-grow: 1;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  ${({ keepBorderRadius }) =>
    keepBorderRadius
      ? ''
      : 'border-top-right-radius: 0; border-bottom-right-radius: 0'};
`;

const StyledMenuButton = styled(IconButton)`
  border-radius: 4px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: 1px;

  svg {
    transform: rotate(-90deg);
    height: 20px;
    margin-top: -4px;
  }
`;

const StyledMenu = styled(Menu)`
  padding: 8px 0;
  /* background-color: red; */
  background-color: ${({ theme: { palette } }) => palette[PC.Error]};
`;

export { StyledButtonWrapper, StyledMainButton, StyledMenuButton, StyledMenu };

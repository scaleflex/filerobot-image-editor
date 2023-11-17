/** External Dependencies */
import styled from 'styled-components';
import Button from '@scaleflex/ui/core/button';
import { Color as PC } from '@scaleflex/ui/utils/types/palette/color';
import { Menu, MenuItem, MenuItemIcon } from '@scaleflex/ui/core';

const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${({ noMargin }) => (noMargin ? '0' : '12px')};
  flex-shrink: 0;
`;

const StyledMainButton = styled(Button)`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const StyledMenu = styled(Menu)`
  padding: 8px;
  background-color: ${({ theme: { palette } }) =>
    palette[PC.BackgroundStateless]};
`;

const StyledMenuItem = styled(MenuItem)`
  border-radius: 4px;
`;

const StyledMenuIcon = styled(MenuItemIcon)`
  display: flex;
  align-items: center;
`;

export {
  StyledButtonWrapper,
  StyledMainButton,
  StyledMenu,
  StyledMenuItem,
  StyledMenuIcon,
};

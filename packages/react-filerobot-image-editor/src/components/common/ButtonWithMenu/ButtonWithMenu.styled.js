/** External Dependencies */
import styled from 'styled-components';
import Button from '@scaleflex/ui/core/button';
import IconButton from '@scaleflex/ui/core/icon-button';
import { Color as PC } from '@scaleflex/ui/utils/types/palette/color';
import { Menu, MenuItem, MenuItemIcon } from '@scaleflex/ui/core';

const StyledButtonWrapper = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
  margin-right: 4px;
  flex-shrink: 0;
`;

const StyledMainButton = styled(Button)`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  ${({ keepBorderRadius }) =>
    keepBorderRadius
      ? ''
      : 'border-top-right-radius: 0; border-bottom-right-radius: 0'};
`;

const StyledMenuButton = styled(IconButton)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: 1px;

  ${({ color, size }) =>
    () => {
      if (color === 'secondary') {
        if (size === 'lg') return 'padding: 10px;';
        if (size === 'md') return 'padding: 11px;';
        if (size === 'sm') return 'padding: 8px;';
        if (size === 'xs') return 'padding: 5px;';
      }

      return '';
    }}

  svg {
    transform: rotate(-90deg);
  }
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
  StyledMenuButton,
  StyledMenu,
  StyledMenuItem,
  StyledMenuIcon,
};

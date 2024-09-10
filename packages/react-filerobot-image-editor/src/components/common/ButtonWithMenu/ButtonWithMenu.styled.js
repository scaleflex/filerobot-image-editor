/** External Dependencies */
import styled from 'styled-components';
import Button from '@scaleflex/ui/core/button';
import { Color as PC } from '@scaleflex/ui/utils/types/palette/color';
import { Menu, MenuItem, MenuItemIcon } from '@scaleflex/ui/core';
import { ArrowBottom } from '@scaleflex/icons';

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

  .SfxButton-EndIcon {
    margin-left: 7px;
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

const StyledArrow = styled(ArrowBottom)`
  margin-top: ${({ buttonSize }) => buttonSize === 'md' && '1px'};
  transform: ${({ open }) => open && `rotate(-180deg)`};
`;

export {
  StyledButtonWrapper,
  StyledMainButton,
  StyledMenu,
  StyledMenuItem,
  StyledMenuIcon,
  StyledArrow,
};

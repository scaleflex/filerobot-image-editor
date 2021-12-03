/** External Dependencies */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ArrowLeftOutline from '@scaleflex/icons/arrow-left-outline';
import Menu from '@scaleflex/ui/core/menu';
import MenuItem, {
  MenuItemIcon,
  MenuItemLabel,
} from '@scaleflex/ui/core/menu-item';

/** Internal Dependencies */
import {
  StyledButtonWithMenu,
  StyledButtonWrapper,
  StyledMenuButton,
} from './ButtonWithMenu.styled';

const ButtonWithMenu = ({
  label,
  onClick,
  title,
  color,
  size = 'sm',
  menuFromBtn,
  menuItems,
  menuPosition = 'bottom',
  arrowColor,
  disabled = false,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (onItemClick) => {
    if (typeof onItemClick === 'function') {
      onItemClick();
    }

    closeMenu();
  };

  const handleButtonClick = (e) => {
    if (menuFromBtn) {
      openMenu(e);
    }

    if (typeof onClick === 'function') {
      onClick();
    }
  };

  const hasMenuItems = menuItems.length > 0;

  return (
    <>
      <StyledButtonWrapper onClick={disabled ? undefined : handleButtonClick}>
        <StyledButtonWithMenu
          color={color}
          size={size}
          title={title}
          keepBorderRadius={!hasMenuItems}
          disabled={disabled}
        >
          {label}
        </StyledButtonWithMenu>
        {hasMenuItems && (
          <StyledMenuButton
            color={color}
            size={size}
            onClick={menuFromBtn || disabled ? undefined : openMenu}
            disabled={disabled}
          >
            <ArrowLeftOutline color={arrowColor} />
          </StyledMenuButton>
        )}
      </StyledButtonWrapper>
      {hasMenuItems && (
        <Menu
          anchorEl={anchorEl}
          onClose={closeMenu}
          open
          position={menuPosition}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.key}
              active={item.isActive}
              onClick={() => handleMenuItemClick(item.onClick)}
              size={size}
            >
              {item.icon && (
                <MenuItemIcon size={size}>
                  <item.icon />
                </MenuItemIcon>
              )}
              <MenuItemLabel>{item.label}</MenuItemLabel>
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};

ButtonWithMenu.defaultProps = {
  title: '',
  color: 'primary',
  size: 'sm',
  menuFromBtn: false,
  menuPosition: 'bottom',
  onClick: undefined,
  disabled: false,
  arrowColor: undefined,
};

ButtonWithMenu.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  menuItems: PropTypes.instanceOf(Array).isRequired,
  title: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  menuFromBtn: PropTypes.bool,
  menuPosition: PropTypes.string,
  disabled: PropTypes.bool,
  arrowColor: PropTypes.string,
};

export default ButtonWithMenu;

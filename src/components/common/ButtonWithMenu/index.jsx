/** External Dependencies */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Arrow } from '@scaleflex/icons';
import {
  Menu,
  MenuItem,
  MenuItemIcon,
  MenuItemLabel,
} from '@scaleflex/ui/core';

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

  return (
    <>
      <StyledButtonWrapper onClick={handleButtonClick}>
        <StyledButtonWithMenu color={color} size={size} title={title}>
          {label}
        </StyledButtonWithMenu>
        <StyledMenuButton
          color={color}
          size={size}
          onClick={menuFromBtn ? undefined : openMenu}
        >
          <Arrow />
        </StyledMenuButton>
      </StyledButtonWrapper>
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
            {item.icon && <MenuItemIcon size={size}>{item.icon}</MenuItemIcon>}
            <MenuItemLabel>{item.label}</MenuItemLabel>
          </MenuItem>
        ))}
      </Menu>
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
};

export default ButtonWithMenu;

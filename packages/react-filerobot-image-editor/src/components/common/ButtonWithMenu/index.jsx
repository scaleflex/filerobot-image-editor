/** External Dependencies */
import React, { useEffect, useState } from 'react';
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

let isFieButtonWithMenuMounted = true;

const ButtonWithMenu = ({
  label,
  onClick,
  title,
  color,
  menuFromBtn,
  menuItems,
  menuPosition = 'bottom',
  arrowColor,
  disabled = false,
  menuStyle,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const buttonSize = 'md';

  const openMenu = (e) => {
    if (isFieButtonWithMenuMounted) {
      e.stopPropagation();
      setAnchorEl(e.currentTarget);
    }
  };

  const closeMenu = () => {
    if (isFieButtonWithMenuMounted) {
      setAnchorEl(null);
    }
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

  useEffect(() => {
    isFieButtonWithMenuMounted = true;

    return () => {
      isFieButtonWithMenuMounted = false;
    };
  }, []);

  const hasMenuItems = menuItems.length > 0;

  return (
    <>
      <StyledButtonWrapper onClick={disabled ? undefined : handleButtonClick}>
        <StyledButtonWithMenu
          color={color}
          size={buttonSize}
          title={title}
          keepBorderRadius={!hasMenuItems}
          disabled={disabled}
        >
          {label}
        </StyledButtonWithMenu>
        {hasMenuItems && (
          <StyledMenuButton
            color={color}
            size={buttonSize}
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
          style={menuStyle}
          position={menuPosition}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.key}
              active={item.isActive}
              onClick={() => handleMenuItemClick(item.onClick)}
              size={buttonSize}
            >
              {item.icon && (
                <MenuItemIcon size={buttonSize}>
                  {typeof item.icon === 'string' ? (
                    // eslint-disable-next-line react/no-danger
                    <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                  ) : (
                    <item.icon />
                  )}
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
  menuFromBtn: false,
  menuPosition: 'bottom',
  onClick: undefined,
  disabled: false,
  arrowColor: undefined,
  menuStyle: undefined,
};

ButtonWithMenu.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  menuItems: PropTypes.instanceOf(Array).isRequired,
  title: PropTypes.string,
  color: PropTypes.string,
  menuFromBtn: PropTypes.bool,
  menuPosition: PropTypes.string,
  disabled: PropTypes.bool,
  arrowColor: PropTypes.string,
  menuStyle: PropTypes.instanceOf(Object),
};

export default ButtonWithMenu;

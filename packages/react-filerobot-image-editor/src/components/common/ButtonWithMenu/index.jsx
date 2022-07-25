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
  StyledMainButton,
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
  className,
  menuStyle,
  wrapperStyle,
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
      <StyledButtonWrapper
        className={`${className}-wrapper`}
        onClick={disabled ? undefined : handleButtonClick}
        style={wrapperStyle}
      >
        <StyledMainButton
          className={`${className}-button`}
          color={color}
          size={buttonSize}
          title={title}
          keepBorderRadius={!hasMenuItems}
          disabled={disabled}
        >
          {label}
        </StyledMainButton>
        {hasMenuItems && (
          <StyledMenuButton
            className={`${className}-menu-opener`}
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
          className={`${className}-menu`}
          anchorEl={anchorEl}
          onClose={closeMenu}
          open
          style={menuStyle}
          position={menuPosition}
        >
          {menuItems.map(
            (item) =>
              item && (
                <MenuItem
                  className={`${className}-menu-item`}
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
              ),
          )}
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
  wrapperStyle: undefined,
};

ButtonWithMenu.propTypes = {
  label: PropTypes.string.isRequired,
  menuItems: PropTypes.instanceOf(Array).isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string,
  color: PropTypes.string,
  menuFromBtn: PropTypes.bool,
  menuPosition: PropTypes.string,
  disabled: PropTypes.bool,
  arrowColor: PropTypes.string,
  menuStyle: PropTypes.instanceOf(Object),
  wrapperStyle: PropTypes.instanceOf(Object),
};

export default ButtonWithMenu;

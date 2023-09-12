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
  StyledMenu,
} from './ButtonWithMenu.styled';

let isFieButtonWithMenuMounted = true;

const ButtonWithMenu = ({
  t,
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
  buttonRef,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const buttonSize = 'md';

  const filteredMenuItems = menuItems.filter(Boolean);
  const hasMultipleMenuItems = filteredMenuItems.length > 1;

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
    if (menuFromBtn && hasMultipleMenuItems) {
      openMenu(e);
      return;
    }

    if (typeof onClick === 'function') {
      onClick();
    } else if (filteredMenuItems[0]?.onClick) {
      filteredMenuItems[0].onClick();
    }
  };

  useEffect(() => {
    isFieButtonWithMenuMounted = true;

    return () => {
      isFieButtonWithMenuMounted = false;
    };
  }, []);

  return (
    <>
      <StyledButtonWrapper
        className={`${className}-wrapper`}
        onClick={disabled ? undefined : handleButtonClick}
        style={wrapperStyle}
        ref={buttonRef}
      >
        <StyledMainButton
          className={`${className}-button`}
          color={color}
          size={buttonSize}
          title={title}
          keepBorderRadius={!hasMultipleMenuItems}
          disabled={disabled}
        >
          {hasMultipleMenuItems ? t('Download') : t('Save as')}
        </StyledMainButton>
        {hasMultipleMenuItems && (
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
      {hasMultipleMenuItems && (
        <StyledMenu
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
        </StyledMenu>
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
  buttonRef: undefined,
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
  buttonRef: PropTypes.instanceOf(Object),
};

export default ButtonWithMenu;
